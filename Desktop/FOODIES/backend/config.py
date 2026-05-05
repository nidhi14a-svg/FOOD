from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongodb_uri: str = "mongodb://localhost:27017"
    mongodb_db: str = "food_waste_mvp"
    jwt_secret: str = "CHANGE_THIS_SECRET"
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 120

    class Config:
        env_file = ".env"

settings = Settings()
