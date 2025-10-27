from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import openai
import os
import logging

db = SQLAlchemy()
bcrypt = Bcrypt()
jwt = JWTManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object("config.Config")

    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

    from app.routes.auth import auth_bp
    from app.routes.appliances import appliance_bp
    from app.routes.users import users_bp
    from app.routes.analytics import analytics_bp  # ✅ Analytics blueprint

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(appliances_bp, url_prefix="/appliances")
    app.register_blueprint(users_bp, url_prefix="/users")
    app.register_blueprint(analytics_bp, url_prefix="/analytics")  # ✅ Added analytics

    with app.app_context():
        db.create_all()

    return app
