from typing import Optional, Dict
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.repositories.base import BaseRepository
from backend.database.collections import Collections

class UserRepository(BaseRepository):
    def __init__(self):
        super().__init__(Collections.USERS)

    async def get_by_email(self, db: AsyncIOMotorDatabase, email: str) -> Optional[Dict]:
        """Fetch a user document by their unique email address."""
        return await self.get_by_field(db, "email", email)

    async def email_exists(self, db: AsyncIOMotorDatabase, email: str) -> bool:
        """Check if a given email is already registered."""
        doc = await self._col(db).find_one({"email": email}, {"_id": 1})
        return doc is not None

user_repo = UserRepository()
