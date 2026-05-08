from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Food Waste Management Platform"
    
    # MongoDB settings
    MONGO_URI: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "foodies_db"
    
    # JWT Settings
    SECRET_KEY: str = "your-super-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 # 8 days

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
