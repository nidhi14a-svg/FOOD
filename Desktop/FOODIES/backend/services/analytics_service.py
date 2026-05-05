from datetime import datetime
from backend.core.db import db

FOOD_COLLECTION = "food_items"
CLAIM_COLLECTION = "claims"

async def get_summary() -> dict:
    total_food_items = await db[FOOD_COLLECTION].count_documents({})
    active_claims = await db[CLAIM_COLLECTION].count_documents({"status": {"$in": ["Pending", "Confirmed"]}})
    expired_items = await db[FOOD_COLLECTION].count_documents({"expiry": {"$lt": datetime.utcnow()}})
    meals_saved = await db[CLAIM_COLLECTION].aggregate(
        [
            {"$group": {"_id": None, "count": {"$sum": "$claimed_quantity"}}}
        ]
    ).to_list(length=1)
    saved_count = meals_saved[0]["count"] if meals_saved else 0
    top_priority_items = await db[FOOD_COLLECTION].find({}).sort("priority_score", -1).limit(5).to_list(length=5)
    return {
        "meals_saved": saved_count,
        "total_food_items": total_food_items,
        "active_claims": active_claims,
        "expired_items": expired_items,
        "top_priority_items": [item["title"] for item in top_priority_items],
    }
