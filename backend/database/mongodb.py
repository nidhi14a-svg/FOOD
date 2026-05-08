"""
database/mongodb.py
────────────────────
Backwards-compatible re-export shim.

All real logic now lives in:
  - database/connection.py   (lifecycle + dependency)
  - database/collections.py  (collection registry + indexes)

Import from either of those files directly in new code.
This file is kept so that existing imports don't break.
"""
from backend.database.connection import connect_db, close_db, get_db, get_collection
from backend.database.collections import Collections, ensure_indexes

__all__ = [
    "connect_db",
    "close_db",
    "get_db",
    "get_collection",
    "Collections",
    "ensure_indexes",
]
