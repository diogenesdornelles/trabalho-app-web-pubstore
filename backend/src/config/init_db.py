from src.config.base import Base
from src.config.engine import engine


async def init_db() -> None:
    import src.schemas.customer  # type: ignore
    import src.schemas.product  # type: ignore
    Base.metadata.create_all(bind=engine)
