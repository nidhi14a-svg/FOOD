from pydantic import BaseModel
from typing import List

class AnalyticsSummary(BaseModel):
    meals_saved: int
    total_food_items: int
    active_claims: int
    expired_items: int
    top_priority_items: List[str]
