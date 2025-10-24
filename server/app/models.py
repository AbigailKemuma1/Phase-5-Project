from app import db

class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    # One user → many appliances
    appliances = db.relationship("Appliance", backref="user", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
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
