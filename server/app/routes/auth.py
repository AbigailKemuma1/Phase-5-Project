from flask import Blueprint, request, jsonify
from app.models import User, UserSettings
from app import db, bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.schemas import UserSchema

auth_bp = Blueprint('auth', __name__, url_prefix="/auth")
user_schema = UserSchema()


# ✅ Signup route
@auth_bp.route("/signup", methods=["POST", "OPTIONS"])
def signup():
    if request.method == "OPTIONS":
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

    # Create default settings for the user
    settings = UserSettings(user_id=new_user.id)
    db.session.add(settings)
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


# ✅ Profile (GET/PUT)
@auth_bp.route("/profile", methods=["GET", "PUT"])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    if request.method == "GET":
        return jsonify({
            "id": user.id,
            "username": user.username,
            "email": user.email,
        }), 200

    data = request.get_json()
    user.username = data.get("username", user.username)
    user.email = data.get("email", user.email)
    db.session.commit()

    return jsonify({"msg": "Profile updated successfully"}), 200


# ✅ Password update
@auth_bp.route("/password", methods=["PUT"])
@jwt_required()
def update_password():
    data = request.get_json()
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not bcrypt.check_password_hash(user.password, current_password):
        return jsonify({"msg": "Current password incorrect"}), 400

    user.password = bcrypt.generate_password_hash(new_password).decode("utf-8")
    db.session.commit()
    return jsonify({"msg": "Password updated successfully"}), 200


# ✅ Delete account
@auth_bp.route("/account", methods=["DELETE"])
@jwt_required()
def delete_account():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({"msg": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"msg": "Account deleted successfully"}), 200


# ✅ User Settings (GET / PUT)
@auth_bp.route("/settings", methods=["GET", "PUT"])
@jwt_required()
def user_settings():
    user_id = get_jwt_identity()
    settings = UserSettings.query.filter_by(user_id=user_id).first()

    if not settings:
        settings = UserSettings(user_id=user_id)
        db.session.add(settings)
        db.session.commit()

    if request.method == "GET":
        return jsonify(settings.to_dict()), 200

    # Update settings
    data = request.get_json()
    settings.theme = data.get("theme", settings.theme)
    settings.notifications = data.get("notifications", settings.notifications)
    settings.language = data.get("language", settings.language)

    db.session.commit()
    return jsonify({"msg": "Settings updated successfully", "settings": settings.to_dict()}), 200
