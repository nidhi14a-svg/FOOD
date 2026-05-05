from datetime import datetime
from backend.core.db import db

NOTIFICATION_COLLECTION = "notifications"

async def list_notifications(user_id: str) -> list[dict]:
    cursor = db[NOTIFICATION_COLLECTION].find({"user_id": user_id}).sort("created_at", -1)
    notifications = []
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        notifications.append(doc)
    return notifications

async def create_notification(user_id: str, title: str, message: str, type: str = "info") -> dict:
    now = datetime.utcnow()
    doc = {
        "user_id": user_id,
        "title": title,
        "message": message,
        "type": type,
        "created_at": now,
        "read": False,
    }
    result = await db[NOTIFICATION_COLLECTION].insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return doc
