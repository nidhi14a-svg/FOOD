import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from backend.repositories.user_repo import user_repo
from backend.core.config import settings
from backend.core.security import get_password_hash

async def seed():
    client = AsyncIOMotorClient(settings.MONGO_URI)
    db = client[settings.DATABASE_NAME]
    
    print("Seeding demo accounts...")
    # Use consistent hashing
    hashed_password = get_password_hash("password123")
    
    # 1. Donor
    await user_repo.upsert(db, {"email": "donor@demo.com"}, {
        "email": "donor@demo.com",
        "hashed_password": hashed_password,
        "full_name": "Demo Donor",
        "role": "provider",
        "is_active": True,
        "is_verified": True
    })
    print("Seeded donor@demo.com")

    # 2. NGO
    await user_repo.upsert(db, {"email": "ngo@demo.com"}, {
        "email": "ngo@demo.com",
        "hashed_password": hashed_password,
        "full_name": "Demo NGO",
        "role": "ngo",
        "is_active": True,
        "is_verified": True
    })
    print("Seeded ngo@demo.com")

    # 3. Volunteer
    await user_repo.upsert(db, {"email": "volunteer@demo.com"}, {
        "email": "volunteer@demo.com",
        "hashed_password": hashed_password,
        "full_name": "Demo Volunteer",
        "role": "volunteer",
        "is_active": True,
        "is_verified": True
    })
    print("Seeded volunteer@demo.com")

    print("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(seed())
