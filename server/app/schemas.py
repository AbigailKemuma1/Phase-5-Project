from marshmallow import Schema, fields

class ApplianceSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    power_rating = fields.Float(required=True)
    hours_per_day = fields.Float(required=True)
    user_id = fields.Int(dump_only=True)

class UserSchema(Schema):
    id = fields.Int(dump_only=True)
    username = fields.Str(required=True)
    email = fields.Email(required=True)
    appliances = fields.List(fields.Nested(ApplianceSchema), dump_only=True)
