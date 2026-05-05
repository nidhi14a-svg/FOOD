from fastapi import APIRouter, Depends

from backend.services.analytics_service import get_summary
from backend.security import require_role

router = APIRouter()

@router.get("/summary")
async def analytics_summary(current_user=Depends(require_role(["admin", "provider"]))):
    return await get_summary()
