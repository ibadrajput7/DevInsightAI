from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[3]

class Setting(BaseSettings):
    DATABASE_URL: str
    SECRET_KEY : str
    ALGORITHM : str
    ACCESS_TOKEN_EXPIRY : int
    SMTP_EMAIL : str
    SMTP_PASSWORD: str
    OPENAI_API_KEY: str

    model_config = SettingsConfigDict(
        env_file = BASE_DIR / "server/.env",
        extra="ignore"
    )

settings = Setting()