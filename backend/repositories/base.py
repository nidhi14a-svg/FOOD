"""
repositories/base.py
─────────────────────
Generic async repository providing standard CRUD operations.
All domain repositories inherit from this class.
"""
from typing import Any, Dict, List, Optional
from datetime import datetime
from bson import ObjectId
from bson.errors import InvalidId
from fastapi import HTTPException, status
from motor.motor_asyncio import AsyncIOMotorDatabase


class BaseRepository:
    """
    Provides standard async CRUD against a named MongoDB collection.

    Args:
        collection_name: The name of the MongoDB collection to operate on.
    """

    def __init__(self, collection_name: str):
        self.collection_name = collection_name

    # ── Internal helpers ───────────────────────
    def _col(self, db: AsyncIOMotorDatabase):
        return db[self.collection_name]

    @staticmethod
    def _str_id(doc: Dict) -> Dict:
        """Convert ObjectId '_id' to a string 'id' field in-place."""
        if doc and "_id" in doc:
            doc["id"] = str(doc.pop("_id"))
        return doc

    @staticmethod
    def _object_id(id: str) -> ObjectId:
        """Convert a string id to ObjectId, raising 404 on invalid format."""
        try:
            return ObjectId(id)
        except (InvalidId, TypeError):
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"Invalid document ID format: '{id}'",
            )

    # ── Read ────────────────────────────────────
    async def get_by_id(self, db: AsyncIOMotorDatabase, id: str) -> Optional[Dict]:
        """Fetch a single document by its MongoDB _id."""
        doc = await self._col(db).find_one({"_id": self._object_id(id)})
        return self._str_id(doc) if doc else None

    async def get_by_field(
        self, db: AsyncIOMotorDatabase, field: str, value: Any
    ) -> Optional[Dict]:
        """Fetch the first document matching a single field/value pair."""
        doc = await self._col(db).find_one({field: value})
        return self._str_id(doc) if doc else None

    async def get_all(
        self,
        db: AsyncIOMotorDatabase,
        filter_query: Optional[Dict] = None,
        skip: int = 0,
        limit: int = 100,
        sort_field: str = "created_at",
        sort_dir: int = -1,
    ) -> List[Dict]:
        """Return a paginated, sorted list of documents matching an optional filter."""
        cursor = (
            self._col(db)
            .find(filter_query or {})
            .sort(sort_field, sort_dir)
            .skip(skip)
            .limit(limit)
        )
        return [self._str_id(doc) async for doc in cursor]

    async def count(
        self, db: AsyncIOMotorDatabase, filter_query: Optional[Dict] = None
    ) -> int:
        """Return the number of documents matching an optional filter."""
        return await self._col(db).count_documents(filter_query or {})

    async def exists(self, db: AsyncIOMotorDatabase, filter_query: Dict) -> bool:
        """Return True if at least one document matches the filter."""
        doc = await self._col(db).find_one(filter_query, {"_id": 1})
        return doc is not None

    # ── Write ───────────────────────────────────
    async def create(self, db: AsyncIOMotorDatabase, data: Dict) -> Dict:
        """Insert a document and return the full created document (with string id)."""
        result = await self._col(db).insert_one(data)
        return await self.get_by_id(db, str(result.inserted_id))

    async def update(
        self, db: AsyncIOMotorDatabase, id: str, updates: Dict
    ) -> Optional[Dict]:
        """
        Apply a partial update ($set) to a document.
        Automatically stamps 'updated_at'.
        """
        updates["updated_at"] = datetime.utcnow()
        result = await self._col(db).update_one(
            {"_id": self._object_id(id)},
            {"$set": updates},
        )
        if result.matched_count == 0:
            return None
        return await self.get_by_id(db, id)

    async def delete(self, db: AsyncIOMotorDatabase, id: str) -> bool:
        """Delete a document by id. Returns True if a document was deleted."""
        result = await self._col(db).delete_one({"_id": self._object_id(id)})
        return result.deleted_count == 1

    async def upsert(
        self, db: AsyncIOMotorDatabase, filter_query: Dict, data: Dict
    ) -> Dict:
        """Insert or update a document. Returns the resulting document."""
        data["updated_at"] = datetime.utcnow()
        await self._col(db).update_one(
            filter_query,
            {"$set": data, "$setOnInsert": {"created_at": datetime.utcnow()}},
            upsert=True,
        )
        doc = await self._col(db).find_one(filter_query)
        return self._str_id(doc)
