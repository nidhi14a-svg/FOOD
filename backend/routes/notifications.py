from fastapi import APIRouter, Depends

from backend.models.notification import NotificationOut, NotificationListResponse
from backend.services.notification_service import list_notifications
from backend.security import require_role

router = APIRouter()

@router.get("/", response_model=NotificationListResponse)
async def notifications(current_user=Depends(require_role(["admin", "provider", "ngo"]))):
    return await list_notifications(current_user.user_id)
