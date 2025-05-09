"""Cria as tabelas no banco de dados"""

from sqlalchemy.ext.asyncio import AsyncEngine

from settings import Settings
from src.database.data_seed.beers import beers
from src.database.data_seed.chopps import chopps
from src.database.data_seed.customers import customers
from src.database.data_seed.sparklings import sparklings
from src.database.data_seed.whiskeys import whiskeys
from src.database.data_seed.wines import wines
from src.database.generate_seed import GenerateSeed
from src.schemas.base import Base


async def init_db(engine: AsyncEngine, settings: Settings) -> None:
    """Inicializa o banco de dados e cria as tabelas"""
    from src.schemas.customer import Customer
    from src.schemas.order import Order
    from src.schemas.product import Product
    from src.schemas.product_ordered import ProductOrdered

    # Cria as tabelas no banco de dados
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    if settings.GENERATE_SEED:
        # Realiza as seeds
        custmgt = GenerateSeed(customers, Customer, "cpf")  # type: ignore
        await custmgt.start()

        prodmgt = GenerateSeed(
            [*chopps, *sparklings, *beers, *whiskeys, *wines], Product, "name"
        )  # type: ignore
        await prodmgt.start()
    else:
        print("INFO: No seed to be generated")