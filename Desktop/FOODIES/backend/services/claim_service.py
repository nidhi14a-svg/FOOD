from datetime import datetime
from typing import List, Optional
from bson import ObjectId

from backend.core.db import db
from backend.models.claim import ClaimCreate, ClaimOut
from backend.errors import BadRequestError, NotFoundError
from backend.services.food_service import complete_food

CLAIM_COLLECTION = "claims"
FOOD_COLLECTION = "food_items"

async def create_claim(payload: ClaimCreate) -> ClaimOut:
    food = await db[FOOD_COLLECTION].find_one({"_id": ObjectId(payload.food_id), "status": "Available"})
    if not food:
        raise BadRequestError("Food item is not available for claim")
    if payload.requested_quantity > food["quantity"]:
        raise BadRequestError("Requested quantity exceeds available quantity")

    now = datetime.utcnow()
    claim_doc = {
        "food_id": payload.food_id,
        "ngo_id": payload.ngo_id,
        "provider_id": str(food["provider_id"]),
        "requested_quantity": payload.requested_quantity,
        "claimed_quantity": payload.requested_quantity,
        "status": "Pending",
        "created_at": now,
        "updated_at": now,
    }
    result = await db[CLAIM_COLLECTION].insert_one(claim_doc)
    claim_doc["_id"] = str(result.inserted_id)
    await db[FOOD_COLLECTION].update_one({"_id": ObjectId(payload.food_id)}, {"$set": {"status": "Claimed", "updated_at": now}})
    return ClaimOut(**claim_doc)

async def list_claims(ngo_id: Optional[str] = None, provider_id: Optional[str] = None) -> List[ClaimOut]:
    query = {}
    if ngo_id:
        query["ngo_id"] = ngo_id
    if provider_id:
        query["provider_id"] = provider_id
    cursor = db[CLAIM_COLLECTION].find(query).sort("created_at", -1)
    items = []
    async for document in cursor:
        document["_id"] = str(document["_id"])
        items.append(ClaimOut(**document))
    return items

async def complete_claim(claim_id: str) -> ClaimOut:
    claim = await db[CLAIM_COLLECTION].find_one({"_id": ObjectId(claim_id)})
    if not claim:
        raise NotFoundError("Claim not found")
    updated_claim = await db[CLAIM_COLLECTION].find_one_and_update(
        {"_id": ObjectId(claim_id)},
        {"$set": {"status": "Completed", "updated_at": datetime.utcnow()}},
        return_document=True,
    )
    if updated_claim:
        await complete_food(claim["food_id"])
        updated_claim["_id"] = str(updated_claim["_id"])
        return ClaimOut(**updated_claim)
    raise BadRequestError("Could not complete claim")
