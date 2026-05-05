from fastapi import APIRouter, Depends
from typing import List

from backend.models.notification import NotificationOut
from backend.services.notification_service import list_notifications
from backend.security import require_role

router = APIRouter()

@router.get("/", response_model=List[NotificationOut])
async def notifications(current_user=Depends(require_role(["admin", "provider", "ngo"]))):
    return await list_notifications(current_user.user_id)
