from datetime import datetime, timedelta
from backend.ai_engine.prioritizer import score_food_item
from fastapi.testclient import TestClient
from backend.main import app
from backend.security import create_access_token

client = TestClient(app)

def test_priority_score_uses_expiry():
    soon = datetime.utcnow() + timedelta(hours=1)
    later = datetime.utcnow() + timedelta(days=2)
    score_soon = score_food_item(5, soon, "Center")
    score_later = score_food_item(5, later, "Center")
    assert score_soon > score_later

def test_priority_score_caps_by_quantity():
    score_small = score_food_item(1, datetime.utcnow() + timedelta(hours=5), "North")
    score_large = score_food_item(20, datetime.utcnow() + timedelta(hours=5), "North")
    assert score_large >= score_small

def test_add_food_endpoint(monkeypatch):
    async def mock_add_food(item):
        from backend.models.food import FoodAddResponse
        return FoodAddResponse(id="fake_id", status="Available", created_at="2026-05-05T00:00:00")
    
    import backend.routes.food as food_route
    monkeypatch.setattr(food_route, "add_food", mock_add_food)
    
    token = create_access_token("provider_id", "provider@example.com", "provider")
    response = client.post(
        "/food/add",
        json={
            "provider_id": "provider_id",
            "title": "Test Food",
            "description": "Test Desc",
            "quantity": 5,
            "type": "Meals",
            "expiry": "2026-05-06T00:00:00Z",
            "location": "North"
        },
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == "fake_id"
    assert data["status"] == "Available"
