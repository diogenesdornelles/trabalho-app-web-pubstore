"""Cria as tabelas no banco de dados"""

from sqlalchemy.ext.asyncio import AsyncEngine
from src.schemas.base import Base
from src.migrations.customers import costumers
from src.migrations.make_migration import MakeMigration
from src.config.get_db_session import get_db_session
from fastapi import Depends

async def init_db(engine: AsyncEngine) -> None:
    """Inicializa o banco de dados e cria as tabelas"""
    from src.schemas.customer import Customer
    from src.schemas.product import Product

    # Cria as tabelas no banco de dados
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Realiza as migrações
    custmgt = MakeMigration(costumers, Customer, "cpf")  # type: ignore
    await custmgt.start()

    prodmgt = MakeMigration([], Product, "name")  # type: ignore
    await prodmgt.start()