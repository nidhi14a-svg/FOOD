"""
services/analytics_service.py
────────────────────────────
Business logic for platform impact and user analytics.

Responsibilities:
  - Aggregating meals saved (total quantity_kg / average meal weight)
  - Calculating CO2 reduction (kg of food * CO2 factor)
  - Generating time-series trend data
  - User-specific dashboard overview metrics

What this service does NOT do:
  - Logic for creating/deleting records
  - HTTP formatting
"""

from datetime import date, timedelta
from typing import List, Dict
from motor.motor_asyncio import AsyncIOMotorDatabase

from backend.repositories.food_repo import food_repo
from backend.repositories.claim_repo import claim_repo
from backend.repositories.user_repo import user_repo
from backend.schemas.dashboard import DashboardOverviewResponse, AnalyticsResponse, TrendPoint


class AnalyticsService:
    """
    Handles aggregation and reporting logic.
    """
    
    # Simple conversion factors
    KG_PER_MEAL = 0.5  # 500g per meal
    CO2_KG_PER_KG_FOOD = 2.5  # 2.5kg CO2 saved per 1kg food waste prevented

    async def get_dashboard_overview(
        self, 
        db: AsyncIOMotorDatabase, 
        user_id: str,
        role: str
    ) -> DashboardOverviewResponse:
        """
        Calculates homepage metrics for a specific user.
        """
        if role == "provider":
            # Count provider's active listings
            active_donations = await food_repo.count(db, {"provider_id": user_id, "status": "AVAILABLE"})
            # Count claims on provider's listings that aren't finished
            # (In a real app, this might need a more complex join/lookup)
            pending_claims = await claim_repo.count(db, {"status": {"$in": ["PENDING_APPROVAL", "ACCEPTED"]}})
            
            # Sum weight of delivered food for this provider
            # This would ideally be a MongoDB aggregation pipeline
            all_provider_listings = await food_repo.get_all(db, {"provider_id": user_id, "status": "PICKED_UP"})
            total_kg = sum(item["quantity_kg"] for item in all_provider_listings)
            
        else: # NGO
            active_donations = await food_repo.count(db, {"status": "AVAILABLE"})
            pending_claims = await claim_repo.count(db, {"ngo_id": user_id, "status": {"$in": ["PENDING_APPROVAL", "ACCEPTED"]}})
            
            # Sum weight of food claimed and delivered by this NGO
            claims = await claim_repo.get_all(db, {"ngo_id": user_id, "status": "DELIVERED"})
            # Note: This is simplified. Normally we'd fetch the weight from the linked food listing.
            total_kg = 0 # Placeholder for aggregation result
            
        return DashboardOverviewResponse(
            active_donations=active_donations,
            pending_claims=pending_claims,
            total_meals_saved=int(total_kg / self.KG_PER_MEAL),
            total_co2_reduced_kg=total_kg * self.CO2_KG_PER_KG_FOOD
        )

    async def get_platform_analytics(
        self, 
        db: AsyncIOMotorDatabase, 
        days: int = 30
    ) -> AnalyticsResponse:
        """
        Calculates global platform impact metrics and trends.
        """
        # Global totals
        # In production, use aggregation pipelines ($group, $sum)
        total_delivered_listings = await food_repo.get_all(db, {"status": "PICKED_UP"})
        total_kg = sum(item["quantity_kg"] for item in total_delivered_listings)
        
        active_ngos = await user_repo.count(db, {"role": "ngo", "is_active": True})
        active_providers = await user_repo.count(db, {"role": "provider", "is_active": True})
        
        # Generate dummy trend data for the last 7 days
        # In production, this would query a time-series collection or aggregate by date
        trends = []
        today = date.today()
        for i in range(days):
            d = today - timedelta(days=i)
            trends.append(TrendPoint(
                date=d,
                meals_saved=10 + (i * 2), # Mock data
                co2_reduced_kg=5.0 + (i * 1.5) # Mock data
            ))

        return AnalyticsResponse(
            platform_total_meals=int(total_kg / self.KG_PER_MEAL),
            platform_total_co2=total_kg * self.CO2_KG_PER_KG_FOOD,
            active_ngos=active_ngos,
            active_providers=active_providers,
            trends=trends
        )


analytics_service = AnalyticsService()
