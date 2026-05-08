from typing import List, Dict, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.repositories.base import BaseRepository
from backend.database.collections import Collections

class ClaimRepository(BaseRepository):
    def __init__(self):
        super().__init__(Collections.CLAIMS)

    async def get_by_ngo(self, db: AsyncIOMotorDatabase, ngo_id: str) -> List[Dict]:
        """Return all claims initiated by a specific NGO."""
        cursor = self._col(db).find({"ngo_id": ngo_id}).sort("created_at", -1)
        return [self._to_str_id(doc) async for doc in cursor]

    async def get_by_listing(self, db: AsyncIOMotorDatabase, listing_id: str) -> Optional[Dict]:
        """Return the active claim for a specific food listing."""
        return await self.get_by_field(db, "listing_id", listing_id)

    async def update_status(self, db: AsyncIOMotorDatabase, claim_id: str, status: str) -> Optional[Dict]:
        """Convenience method to update only the claim status."""
        return await self.update(db, claim_id, {"status": status})

claim_repo = ClaimRepository()
