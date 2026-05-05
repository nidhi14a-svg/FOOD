from datetime import datetime, timedelta
from backend.ai_engine.prioritizer import score_food_item


def test_priority_score_uses_expiry():
    soon = datetime.utcnow() + timedelta(hours=1)
    later = datetime.utcnow() + timedelta(days=2)
    score_soon = score_food_item(5, soon, "Center")
    score_later = score_food_item(5, later, "Center")
    assert score_soon > score_later


def test_priority_score_caps_by_quantity():
    score_small = score_food_item(1, datetime.utcnow() + timedelta(hours=5), "North")
    score_large = score_food_item(20, datetime.utcnow() + timedelta(hours=5), "North")
    assert score_large >= score_small
