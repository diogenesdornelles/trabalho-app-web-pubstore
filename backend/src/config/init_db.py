"""Cria as tabelas no banco de dados"""

from sqlalchemy.ext.asyncio import AsyncEngine
from src.schemas.base import Base
from src.seeds.customers import costumers
from src.seeds.make_seed import MakeSeed


async def init_db(engine: AsyncEngine) -> None:
    """Inicializa o banco de dados e cria as tabelas"""
    from src.schemas.customer import Customer
    from src.schemas.product import Product

    # Cria as tabelas no banco de dados
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Realiza as seeds
    custmgt = MakeSeed(costumers, Customer, "cpf")  # type: ignore
    await custmgt.start()

    prodmgt = MakeSeed([], Product, "name")  # type: ignore
    await prodmgt.start()