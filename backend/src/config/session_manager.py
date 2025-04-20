from src.config.database_session_manager import DatabaseSessionManager
from src.dependencies.get_settings import get_settings

settings = get_settings()


sessionmanager = DatabaseSessionManager(
    f"postgresql+asyncpg://{settings.DB_USER}:{settings.DB_PWD}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}",
    {"echo": True},
)
