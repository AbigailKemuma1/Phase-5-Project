from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Appliance

appliances_bp = Blueprint("appliances", __name__)

@appliances_bp.route("/", methods=["GET"])
@jwt_required()
def get_appliances():
    user_id = get_jwt_identity()
    appliances = Appliance.query.filter_by(user_id=user_id).all()
    return jsonify([a.to_dict() for a in appliances]), 200


@appliances_bp.route("/", methods=["POST"])
@jwt_required()
def add_appliance():
    user_id = get_jwt_identity()
    data = request.get_json()

    name = data.get("name")
    power_rating = data.get("power_rating")
    hours_per_day = data.get("hours_per_day", 0)

    if not name or not power_rating:
        return jsonify({"error": "Name and power rating are required"}), 400

    new_appliance = Appliance(
        name=name,
        power_rating=power_rating,
        hours_per_day=hours_per_day,
        user_id=user_id
    )

    db.session.add(new_appliance)
    db.session.commit()

    return jsonify(new_appliance.to_dict()), 201


# ✅ Update an appliance
@appliances_bp.route("/<int:id>", methods=["PATCH"])
@jwt_required()
def update_appliance(id):
    user_id = get_jwt_identity()
    appliance = Appliance.query.filter_by(id=id, user_id=user_id).first()
    if not appliance:
        return jsonify({"error": "Appliance not found"}), 404

    data = request.get_json()
    appliance.name = data.get("name", appliance.name)
    appliance.power_rating = data.get("power_rating", appliance.power_rating)
    appliance.hours_per_day = data.get("hours_per_day", appliance.hours_per_day)

    db.session.commit()
    return jsonify(appliance.to_dict()), 200


# ✅ Delete an appliance
@appliances_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_appliance(id):
    user_id = get_jwt_identity()
    appliance = Appliance.query.filter_by(id=id, user_id=user_id).first()
    if not appliance:
        return jsonify({"error": "Appliance not found"}), 404

    db.session.delete(appliance)
    db.session.commit()

    return jsonify({"message": "Appliance deleted"}), 200
