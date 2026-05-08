from datetime import datetime
from math import exp

# Simple prioritization logic based on expiry proximity and quantity.

def score_food_item(quantity: int, expiry: datetime, location: str) -> float:
    hours_until_expiry = max((expiry - datetime.utcnow()).total_seconds() / 3600, 0)
    freshness_score = exp(-hours_until_expiry / 24)
    volume_score = min(quantity / 10.0, 1.0)
    location_penalty = 0.9 if location else 1.0
    return round((freshness_score * 0.7 + volume_score * 0.3) * location_penalty, 4)
