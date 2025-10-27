from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Appliance
from datetime import datetime, timedelta

analytics_bp = Blueprint("analytics_bp", __name__, url_prefix="/analytics")

@analytics_bp.route("/", methods=["GET"])
@jwt_required()
def get_analytics():
    user_id = get_jwt_identity()

    # Fetch all appliances for this user
    appliances = Appliance.query.filter_by(user_id=user_id).all()
    if not appliances:
        return jsonify({"message": "No appliances found"}), 404

    # Assume today is the last day in the summary
    today = datetime.utcnow().date()
    last_7_days = [today - timedelta(days=i) for i in range(6, -1, -1)]

    # Daily summary: sum power_rating * hours_per_day for all appliances
    daily_summary = []
    for day in last_7_days:
        total_usage = sum(a.power_rating * a.hours_per_day for a in appliances)  # kWh per day
        total_cost = total_usage * 0.2  # example: $0.2 per kWh
        total_carbon = total_usage * 0.5  # example: 0.5 kg CO2 per kWh
        daily_summary.append({
            "day": day.strftime("%a"),
            "usage": round(total_usage, 2),
            "cost": round(total_cost, 2),
            "carbon": round(total_carbon, 2)
        })

    # Hourly summary today: evenly distribute daily usage
    hourly_summary = []
    for hour in range(24):
        total_usage = sum(a.power_rating * a.hours_per_day for a in appliances)
        hourly_usage = total_usage / 24
        hourly_summary.append({
            "hour": f"{hour}:00",
            "usage": round(hourly_usage, 2)
        })

    # Appliance breakdown
    total_usage_all = sum(a.power_rating * a.hours_per_day for a in appliances)
    appliance_summary = []
    for a in appliances:
        usage = a.power_rating * a.hours_per_day
        percentage = int((usage / total_usage_all) * 100) if total_usage_all else 0
        appliance_summary.append({
            "name": a.name,
            "usage": f"{round(usage,2)} kWh",
            "percentage": percentage,
            "icon": getattr(a, "icon", "🔌"),
            "color": getattr(a, "color", "emerald")
        })

    # Summary cards
    total_usage_value = sum(a.power_rating * a.hours_per_day for a in appliances)
    total_cost = total_usage_value * 0.2
    total_carbon = total_usage_value * 0.5
    peak_hour = max(hourly_summary, key=lambda x: x['usage'])

    summary = {
        "total_usage": round(total_usage_value, 2),
        "total_cost": round(total_cost, 2),
        "co2_emissions": round(total_carbon, 2),
        "peak_usage": {"value": round(peak_hour['usage'], 2), "time": peak_hour['hour']}
    }

    # Simple insights
    insights = [
        "Your usage is higher on weekends" if any(d['usage'] > total_usage_value/7 for d in daily_summary[-2:]) else "Your usage is stable on weekends",
        f"Peak usage at {peak_hour['hour']} costs more",
        f"You saved ${round(total_cost*0.2,2)} this week!"  # example logic
    ]

    return jsonify({
        "summary": summary,
        "dailyData": daily_summary,
        "hourlyData": hourly_summary,
        "appliances": appliance_summary,
        "insights": insights
    })
