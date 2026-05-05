from datetime import datetime
from typing import List, Optional
from bson import ObjectId

from backend.core.db import db
from backend.models.food import FoodCreate, FoodOut
from backend.ai_engine.prioritizer import score_food_item
from backend.errors import NotFoundError

FOOD_COLLECTION = "food_items"

async def add_food(item: FoodCreate) -> FoodOut:
    now = datetime.utcnow()
    priority_score = score_food_item(item.quantity, item.expiry, item.location)
    doc = {
        "provider_id": item.provider_id,
        "title": item.title,
        "description": item.description,
        "quantity": item.quantity,
        "type": item.type,
        "expiry": item.expiry,
        "location": item.location,
        "status": "Available",
        "priority_score": priority_score,
        "created_at": now,
        "updated_at": now,
    }
    result = await db[FOOD_COLLECTION].insert_one(doc)
    doc["_id"] = str(result.inserted_id)
    return FoodOut(**doc)

async def list_food(status: Optional[str] = None, type: Optional[str] = None, location: Optional[str] = None) -> List[FoodOut]:
    query = {}
    if status:
        query["status"] = status
    if type:
        query["type"] = type
    if location:
        query["location"] = location
    cursor = db[FOOD_COLLECTION].find(query).sort("priority_score", -1)
    items = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        items.append(FoodOut(**document))
    return items

async def complete_food(food_id: str) -> FoodOut:
    result = await db[FOOD_COLLECTION].find_one_and_update(
        {"_id": ObjectId(food_id)},
        {"$set": {"status": "Completed", "updated_at": datetime.utcnow()}},
        return_document=True,
    )
    if not result:
        raise NotFoundError("Food item not found")
    result["_id"] = str(result["_id"])
    return FoodOut(**result)
