import pytest
from backend.services.auth_service import hash_password, verify_password


def test_password_hash_and_verify():
    password = "SecurePass123!"
    hashed = hash_password(password)
    assert hashed != password
    assert verify_password(password, hashed)


@pytest.mark.asyncio
async def test_register_duplicate_email(monkeypatch):
    async def fake_find_user_by_email(email):
        return {"email": email, "name": "Existing", "role": "ngo", "password_hash": "hash"}

    import backend.services.auth_service as service_module
    monkeypatch.setattr(service_module, "find_user_by_email", fake_find_user_by_email)

    from backend.models.user import UserCreate
    with pytest.raises(Exception):
        await service_module.register_user(UserCreate(name="Test", email="test@example.com", password="pass", role="ngo"))
