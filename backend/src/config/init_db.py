""" Cria as tabelas no banco de dados"""
from src.config.base import Base
from src.config.engine import engine


async def init_db() -> None:
    """inicia o Db
    """
    import src.schemas.customer  # type: ignore
    import src.schemas.product  # type: ignore
    Base.metadata.create_all(bind=engine)
