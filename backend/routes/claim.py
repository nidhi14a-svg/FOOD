from fastapi import APIRouter, Depends, Query, Path
from typing import List, Optional

from backend.models.claim import ClaimCreate, ClaimOut, ClaimResponse, ClaimListResponse, ClaimCompleteResponse
from backend.services.claim_service import create_claim, list_claims, complete_claim
from backend.security import require_role

router = APIRouter()

@router.post("/", response_model=ClaimResponse)
async def add_claim(claim: ClaimCreate, current_user=Depends(require_role(["ngo"]))):
    return await create_claim(claim)

@router.get("/list", response_model=ClaimListResponse)
async def claim_list(
    ngo_id: Optional[str] = Query(None),
    provider_id: Optional[str] = Query(None),
    current_user=Depends(require_role(["admin", "provider", "ngo"])),
):
    return await list_claims(ngo_id=ngo_id, provider_id=provider_id)

@router.post("/{claim_id}/complete", response_model=ClaimCompleteResponse)
async def complete_claim_endpoint(
    claim_id: str = Path(...), current_user=Depends(require_role(["admin", "provider"]))
):
    return await complete_claim(claim_id)
