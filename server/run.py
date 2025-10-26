import sys
import os
from flask import Flask
from flask_cors import CORS

# Ensure the app package is visible
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from chatbot import app as chatbot_app

app = create_app()
CORS(app)  # Enable CORS for the main app

# Register chatbot routes with the main app
for rule in chatbot_app.url_map.iter_rules():
    if rule.endpoint != 'static':
        view_func = chatbot_app.view_functions[rule.endpoint]
        app.add_url_rule(rule.rule, endpoint=rule.endpoint, view_func=view_func, methods=rule.methods)

if __name__ == "__main__":
    print("✅ Flask server is running on http://127.0.0.1:5000")
    print("✅ Chat endpoint available at http://127.0.0.1:5000/chat")
    app.run(debug=True, port=5000, host='127.0.0.1')
