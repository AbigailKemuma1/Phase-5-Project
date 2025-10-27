from flask import Blueprint, request, jsonify
from app.models import User
from app import db, bcrypt
from flask_jwt_extended import create_access_token
from app.schemas import UserSchema

auth_bp = Blueprint('auth', __name__)
user_schema = UserSchema()

# ✅ Signup route
@auth_bp.route("/signup", methods=["POST", "OPTIONS"])
def signup():
    if request.method == "OPTIONS":
        # Handle CORS preflight
        return jsonify({"message": "CORS preflight passed"}), 200

    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    new_user = User(username=username, email=email, password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()

    return jsonify(user_schema.dump(new_user)), 201

# ✅ Login route
@auth_bp.route("/login", methods=["POST", "OPTIONS"])
def login():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight passed"}), 200

    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and bcrypt.check_password_hash(user.password, password):
        token = create_access_token(identity=user.id)
        return jsonify({
            "access_token": token,
            "username": user.username,
            "email": user.email
        }), 200

    return jsonify({"msg": "Invalid credentials"}), 401
