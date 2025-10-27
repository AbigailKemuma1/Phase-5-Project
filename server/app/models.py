from app import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    
    # Profile fields
    phone = db.Column(db.String(20), nullable=True)
    address = db.Column(db.String(200), nullable=True)
    energy_goal = db.Column(db.Float, nullable=True)
    
    # Notification preferences (stored as JSON string or separate table)
    email_notifications = db.Column(db.Boolean, default=True)
    push_notifications = db.Column(db.Boolean, default=True)
    weekly_reports = db.Column(db.Boolean, default=True)
    usage_alerts = db.Column(db.Boolean, default=True)
    
    # App preferences
    currency = db.Column(db.String(10), default='USD')
    energy_unit = db.Column(db.String(10), default='kWh')
    theme = db.Column(db.String(10), default='dark')

    # One user → many appliances
    appliances = db.relationship("Appliance", backref="user", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "phone": self.phone,
            "address": self.address,
            "energy_goal": self.energy_goal,
            "notifications": {
                "email": self.email_notifications,
                "push": self.push_notifications,
                "weekly": self.weekly_reports,
                "alerts": self.usage_alerts
            },
            "preferences": {
                "currency": self.currency,
                "energyUnit": self.energy_unit,
                "theme": self.theme
            },
            "appliances": [a.to_dict() for a in self.appliances]
        }


class Appliance(db.Model):
    __tablename__ = "appliances"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    power_rating = db.Column(db.Float, nullable=False)        # changed from wattage
    hours_per_day = db.Column(db.Float, nullable=False)       # changed from hours_used_per_day

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "power_rating": self.power_rating,
            "hours_per_day": self.hours_per_day,
            "user_id": self.user_id
        }
