from flask import Blueprint, request, jsonify
import requests

chat_bp = Blueprint('chat', __name__, url_prefix='/api')

@chat_bp.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    prompt = data.get('prompt', '')
    ollama_url = 'http://localhost:11434/api/generate'
    payload = {
        "model": "mistral",
        "prompt": f"You are a helpful assistant. {prompt}"
    }
    try:
        response = requests.post(ollama_url, json=payload, stream=True)
        response.raise_for_status()
        full_reply = ""
        for line in response.iter_lines():
            if line:
                try:
                    obj = requests.utils.json.loads(line)
                    full_reply += obj.get("response", "")
                except Exception:
                    continue
        if not full_reply.strip():
            full_reply = "Here are some general energy saving tips:\n1. Turn off lights when not in use\n2. Use energy-efficient appliances\n3. Keep your thermostat at optimal temperatures\n4. Regular maintenance of HVAC systems"
        return jsonify({"response": full_reply})
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 500
