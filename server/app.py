from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

app = Flask(__name__)
CORS(app)  # allow requests from React frontend

# Use environment variable for safety
openai.api_key = os.getenv("OPENAI_API_KEY")

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
# Key: user_id, Value: list of messages (role + content)
conversations = {}

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_id = data.get("user_id", "default")  # default user if none provided
    user_message = data.get("message", "")

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
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=conversations[user_id],
            temperature=0.7,
            max_tokens=200
        )
        answer = response.choices[0].message["content"].strip()
        # Save AI response to conversation
        conversations[user_id].append({"role": "assistant", "content": answer})
    except Exception as e:
        print(e)
        answer = "Sorry, I couldn't process your request right now."

    return jsonify({"response": answer})

if __name__ == "__main__":
    app.run(debug=True)
