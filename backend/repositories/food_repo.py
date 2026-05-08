from typing import List, Dict, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.repositories.base import BaseRepository
from backend.database.collections import Collections

class FoodRepository(BaseRepository):
    def __init__(self):
        super().__init__(Collections.FOOD_LISTINGS)

    async def get_available(self, db: AsyncIOMotorDatabase, skip: int = 0, limit: int = 100) -> List[Dict]:
        """Return only AVAILABLE listings, sorted by newest first."""
        cursor = self._col(db).find({"status": "AVAILABLE"}).sort("created_at", -1).skip(skip).limit(limit)
        return [self._to_str_id(doc) async for doc in cursor]

    async def get_by_provider(self, db: AsyncIOMotorDatabase, provider_id: str) -> List[Dict]:
        """Return all listings posted by a specific provider."""
        cursor = self._col(db).find({"provider_id": provider_id}).sort("created_at", -1)
        return [self._to_str_id(doc) async for doc in cursor]

    async def update_status(self, db: AsyncIOMotorDatabase, listing_id: str, status: str) -> Optional[Dict]:
        """Convenience method to update only the listing status."""
        return await self.update(db, listing_id, {"status": status})

food_repo = FoodRepository()
