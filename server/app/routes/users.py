from flask import Blueprint, request, jsonify
from app.models import User
from app import db, bcrypt
from flask_jwt_extended import jwt_required, get_jwt_identity

users_bp = Blueprint('users', __name__)

# Get current user profile
@users_bp.route("/profile", methods=["GET", "OPTIONS"])
@jwt_required()
def get_profile():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight passed"}), 200
    
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    return jsonify(user.to_dict()), 200

# Update user profile
@users_bp.route("/profile", methods=["PUT", "OPTIONS"])
@jwt_required()
def update_profile():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight passed"}), 200
    
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    data = request.json
    
    # Update basic profile fields
    if "username" in data:
        user.username = data["username"]
    if "email" in data:
        # Check if email is already taken by another user
        existing_user = User.query.filter_by(email=data["email"]).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({"msg": "Email already in use"}), 400
        user.email = data["email"]
    if "phone" in data:
        user.phone = data["phone"]
    if "address" in data:
        user.address = data["address"]
    if "energy_goal" in data:
        user.energy_goal = data["energy_goal"]
    
    # Update notification preferences
    if "notifications" in data:
        notifications = data["notifications"]
        if "email" in notifications:
            user.email_notifications = notifications["email"]
        if "push" in notifications:
            user.push_notifications = notifications["push"]
        if "weekly" in notifications:
            user.weekly_reports = notifications["weekly"]
        if "alerts" in notifications:
            user.usage_alerts = notifications["alerts"]
    
    # Update app preferences
    if "preferences" in data:
        preferences = data["preferences"]
        if "currency" in preferences:
            user.currency = preferences["currency"]
        if "energyUnit" in preferences:
            user.energy_unit = preferences["energyUnit"]
        if "theme" in preferences:
            user.theme = preferences["theme"]
    
    db.session.commit()
    
    return jsonify(user.to_dict()), 200

# Update password
@users_bp.route("/password", methods=["PUT", "OPTIONS"])
@jwt_required()
def update_password():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight passed"}), 200
    
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    data = request.json
    current_password = data.get("current_password")
    new_password = data.get("new_password")
    
    if not current_password or not new_password:
        return jsonify({"msg": "Current and new password required"}), 400
    
    # Verify current password
    if not bcrypt.check_password_hash(user.password, current_password):
        return jsonify({"msg": "Current password is incorrect"}), 401
    
    # Update to new password
    hashed_pw = bcrypt.generate_password_hash(new_password).decode("utf-8")
    user.password = hashed_pw
    db.session.commit()
    
    return jsonify({"msg": "Password updated successfully"}), 200

# Delete account
@users_bp.route("/account", methods=["DELETE", "OPTIONS"])
@jwt_required()
def delete_account():
    if request.method == "OPTIONS":
        return jsonify({"message": "CORS preflight passed"}), 200
    
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({"msg": "User not found"}), 404
    
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({"msg": "Account deleted successfully"}), 200

