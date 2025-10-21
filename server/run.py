import sys
import os
from flask import Flask

# Ensure the app package is visible
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app  # now this should work

app = create_app()

if __name__ == "__main__":
    print("✅ Flask server is running on http://127.0.0.1:5000")
    app.run(debug=True)
