from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Appliance

appliance_bp = Blueprint("appliance_bp", __name__, url_prefix="/appliances")


# --- Helper for CORS preflight ---
def cors_preflight_response():
    response = jsonify({"message": "CORS preflight passed"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
    return response, 200


# --- Root route: GET all appliances, POST new appliance ---
@appliance_bp.route("/", methods=["GET", "POST", "OPTIONS"])
@jwt_required(optional=True)  # allow OPTIONS requests without JWT
def appliances_root():
    if request.method == "OPTIONS":
        return cors_preflight_response()

    user_id = get_jwt_identity()
    if request.method == "GET":
        appliances = Appliance.query.filter_by(user_id=user_id).all()
        return jsonify([a.to_dict() for a in appliances])

    if request.method == "POST":
        data = request.get_json()
        new_appliance = Appliance(
            name=data.get("name"),
            power_rating=data.get("power_rating"),
            hours_per_day=data.get("hours_per_day", 0),
            user_id=user_id
        )
        db.session.add(new_appliance)
        db.session.commit()
        return jsonify(new_appliance.to_dict()), 201


# --- Detail route: GET, PATCH, DELETE single appliance ---
@appliance_bp.route("/<int:id>", methods=["GET", "PATCH", "DELETE", "OPTIONS"])
@jwt_required(optional=True)  # allow OPTIONS requests without JWT
def appliance_detail(id):
    if request.method == "OPTIONS":
        return cors_preflight_response()

    user_id = get_jwt_identity()
    appliance = Appliance.query.filter_by(id=id, user_id=user_id).first()
    if not appliance:
        return jsonify({"error": "Appliance not found"}), 404

    if request.method == "GET":
        return jsonify(appliance.to_dict())

    if request.method == "PATCH":
        data = request.get_json()
        appliance.name = data.get("name", appliance.name)
        appliance.power_rating = data.get("power_rating", appliance.power_rating)
        appliance.hours_per_day = data.get("hours_per_day", appliance.hours_per_day)
        db.session.commit()
        return jsonify(appliance.to_dict())

    if request.method == "DELETE":
        db.session.delete(appliance)
        db.session.commit()
        return jsonify({"message": "Appliance deleted"})
