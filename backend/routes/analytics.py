from fastapi import APIRouter, Depends

from backend.services.analytics_service import get_summary
from backend.models.analytics import AnalyticsSummary
from backend.security import require_role

router = APIRouter()

@router.get("/summary", response_model=AnalyticsSummary)
async def analytics_summary(current_user=Depends(require_role(["admin", "provider"]))):
    return await get_summary()
