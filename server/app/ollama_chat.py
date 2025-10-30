from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL_NAME = "gemma2"

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.get_json()
        prompt = data.get('message', '')
        if not prompt:
            return jsonify({"error": "No message provided."}), 400
        ollama_payload = {
            "model": MODEL_NAME,
            "prompt": prompt
        }
        ollama_response = requests.post(OLLAMA_URL, json=ollama_payload, timeout=30)
        ollama_response.raise_for_status()
        return jsonify(ollama_response.json())
    except requests.RequestException as e:
        return jsonify({"error": "Ollama API error.", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"error": "Server error.", "details": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
