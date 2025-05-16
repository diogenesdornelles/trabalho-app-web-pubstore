"""get_db module"""

from src.config.session_manager import sessionmanager


async def get_db_session():
    """Retorna uma sessão do banco de dados

    Yields:
        _type_: _description_
    """
    async with sessionmanager.session() as session:
        yield session
