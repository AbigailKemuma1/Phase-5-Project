from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import openai
import os
import logging

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")  # Ensure you have a Config class in config.py

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Enable CORS for all routes
    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    # Import blueprints
    from app.routes.auth import auth_bp
    from app.routes.appliances import appliance_bp
    from app.routes.analytics import analytics_bp  # ✅ Analytics blueprint

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(appliance_bp, url_prefix="/appliances")
    app.register_blueprint(analytics_bp, url_prefix="/analytics")  # ✅ Added analytics

    # Set up logging
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("chatbot")

    # FAQs for quick responses
    FAQS = {
        "how do i track my energy usage": "Go to the dashboard and enter your daily electricity readings.",
        "how can i save more energy": "Use energy-efficient bulbs, unplug unused devices, and monitor peak usage times.",
        "can i set energy-saving goals": "Yes! Go to the Goals section and create a new target.",
        "is my data private": "Yes, all your data is stored securely and only accessible to you."
    }

    # Keyword-based recommendations
    RECOMMENDATIONS = {
        "ac": "Try setting your thermostat to 78°F (25°C), use ceiling fans, and ensure windows are well-sealed.",
        "heating": "Lower your thermostat by a few degrees and wear warmer clothes indoors to save energy.",
        "lighting": "Switch to LED bulbs and turn off lights when not in use."
    }

    # In-memory conversation storage
    conversations = {}

    @app.route("/chat", methods=["POST", "OPTIONS"])
    def chat():
        logger.info(f"Received {request.method} request from {getattr(request, 'origin', 'unknown')}")
        if request.method == "OPTIONS":
            logger.info("Handling CORS preflight request")
            response = jsonify({"message": "CORS preflight passed"})
            response.headers.add('Access-Control-Allow-Origin', '*')
            response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
            response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
            return response, 200

        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        user_id = data.get("user_id", "default")
        user_message = data.get("message", "")
        if not user_message:
            return jsonify({"error": "No message provided"}), 400

        if user_id not in conversations:
            conversations[user_id] = [
                {"role": "system", "content": "You are an AI Energy Advisor for an Energy Saver Tracker app. Answer politely and give helpful energy-saving advice."}
            ]

        lower_msg = user_message.lower()
        for question, answer in FAQS.items():
            if question in lower_msg:
                conversations[user_id].append({"role": "user", "content": user_message})
                conversations[user_id].append({"role": "assistant", "content": answer})
                return jsonify({"response": answer})

        for key, advice in RECOMMENDATIONS.items():
            if key in lower_msg:
                conversations[user_id].append({"role": "user", "content": user_message})
                conversations[user_id].append({"role": "assistant", "content": advice})
                return jsonify({"response": advice})

        conversations[user_id].append({"role": "user", "content": user_message})

        try:
            openai.api_key = os.getenv("OPENAI_API_KEY")
            if not openai.api_key:
                logger.warning("No OpenAI API key set - using fallback response")
                answer = (
                    "I'm currently in maintenance mode. Here are some general energy-saving tips:\n"
                    "1. Turn off lights when not in use\n"
                    "2. Use energy-efficient appliances\n"
                    "3. Keep your thermostat at optimal temperatures\n"
                    "4. Regular maintenance of HVAC systems"
                )
            else:
                logger.info(f"Sending request to OpenAI API for user {user_id}")
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=conversations[user_id],
                    temperature=0.7,
                    max_tokens=200
                )
                answer = response.choices[0].message["content"].strip()

            conversations[user_id].append({"role": "assistant", "content": answer})
            logger.info(f"Successfully generated response for user {user_id}")

        except Exception as e:
            logger.error(f"Error generating response: {str(e)}")
            if "api_key" in str(e).lower():
                answer = "The AI service is currently unavailable. Please check your API key configuration."
            else:
                answer = f"I'm having trouble processing your request. Error: {str(e)}"

        return jsonify({"response": answer})

    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()

    return app
