"""CRUD para produtos"""

from typing import Literal, Optional
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.models.product import ProductOut
from src.schemas.product import Product as ProductDBModel


async def get_all(db_session: AsyncSession) -> list[ProductOut]:
    """Obtém todos os produtos"""
    result = await db_session.execute(select(ProductDBModel))
    products = result.scalars().all()
    return [ProductOut.model_validate(p) for p in products]


async def get_one(db_session: AsyncSession, product_id: str) -> ProductOut:
    """Obtém um único produto pelo ID"""

    result = await db_session.execute(
        select(ProductDBModel).where(ProductDBModel.id == UUID(product_id, version=4))
    )
    product = result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return ProductOut.model_validate(product)


async def get_many(
    *,
    db_session: AsyncSession,
    name: Optional[str] = None,
    description: Optional[str] = None,
    brand: Optional[str] = None,
    product_type: Optional[Literal["chopp", "wine", "drink", "sparkling"]] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    skip: int | None = 0,
    limit: int = 10,
) -> list[ProductOut]:
    """Obtém produtos com base em filtros"""
    query = select(ProductDBModel)
    order_by: Literal["price", "name"] = "name"
    direction: Literal["asc", "desc"] = "asc"
    query = (
        query.order_by(getattr(getattr(ProductDBModel, order_by), direction)())
        .offset(skip)
        .limit(limit)
    )

    if name:
        query = query.filter(ProductDBModel.name.ilike(f"%{name}%"))
    if description:
        query = query.filter(ProductDBModel.description.ilike(f"%{description}%"))
    if brand:
        query = query.filter(ProductDBModel.brand.ilike(f"%{brand}%"))
    if product_type:
        query = query.filter(ProductDBModel.type == product_type)
    if min_price:
        query = query.filter(ProductDBModel.price >= min_price)
    if max_price:
        query = query.filter(ProductDBModel.price <= max_price)

    result = await db_session.execute(query)
    products = result.scalars().all()
    if not products:
        raise HTTPException(status_code=404, detail="No products found")
    return [ProductOut.model_validate(product) for product in products]
