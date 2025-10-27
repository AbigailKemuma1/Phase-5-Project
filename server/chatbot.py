from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from config import Config
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)  # Enable CORS for all routes

# Additional CORS headers
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

# Use environment variable for safety
openai.api_key = os.getenv("OPENAI_API_KEY")
logger.info(f"OpenAI API Key {'is set' if openai.api_key else 'is NOT set'}")

if not openai.api_key:
    print("⚠️ Warning: OPENAI_API_KEY not set. Chatbot will use fallback responses.")

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

conversations = {}

@app.route("/chat", methods=["POST", "OPTIONS"])
def chat():
    logger.info(f"Received {request.method} request from {request.origin}")
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

user_id = data.get("user_id", "default")  # default user if none provided
user_message = data.get("message", "")

if not user_message:
    return jsonify({"error": "No message provided"}), 400

    # Initialize conversation if it doesn't exist
    if user_id not in conversations:
        conversations[user_id] = [
            {"role": "system", "content": "You are an AI Energy Advisor for an Energy Saver Tracker app. Answer politely and give helpful energy-saving advice."}
        ]

    # Check FAQs first
    lower_msg = user_message.lower()
    for question, answer in FAQS.items():
        if question in lower_msg:
            conversations[user_id].append({"role": "user", "content": user_message})
            conversations[user_id].append({"role": "assistant", "content": answer})
            return jsonify({"response": answer})

    # Check keyword-based recommendations
    for key, advice in RECOMMENDATIONS.items():
        if key in lower_msg:
            conversations[user_id].append({"role": "user", "content": user_message})
            conversations[user_id].append({"role": "assistant", "content": advice})
            return jsonify({"response": advice})

    # Add user message to conversation
    conversations[user_id].append({"role": "user", "content": user_message})

    # Generate AI response with GPT-4
    try:
        if not openai.api_key:
            logger.warning("No OpenAI API key set - using fallback response")
            # Use the last FAQ or recommendation that matched, or a default response
            answer = "I'm currently in maintenance mode. Here are some general energy-saving tips:\n" + \
                    "1. Turn off lights when not in use\n" + \
                    "2. Use energy-efficient appliances\n" + \
                    "3. Keep your thermostat at optimal temperatures\n" + \
                    "4. Regular maintenance of HVAC systems"
        else:
            logger.info(f"Sending request to OpenAI API for user {user_id}")
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=conversations[user_id],
                temperature=0.7,
                max_tokens=200
            )
            answer = response.choices[0].message["content"].strip()
            
        # Save AI response to conversation
        conversations[user_id].append({"role": "assistant", "content": answer})
        logger.info(f"Successfully generated response for user {user_id}")
        
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        if "api_key" in str(e).lower():
            answer = "The AI service is currently unavailable. Please check your API key configuration."
        else:
            answer = f"I'm having trouble processing your request. Error: {str(e)}"

    return jsonify({"response": answer})

if __name__ == "__main__":
    print("✅ Chat server running on http://127.0.0.1:3000")
    app.run(debug=True, port=3000, host='127.0.0.1')
