"""get_db module"""

from src.config.session_manager import sessionmanager


async def get_db_session():
    async with sessionmanager.session() as session:
        yield session
