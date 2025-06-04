"""Repository para produtos"""

from typing import Literal, Optional
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy import select

from src.crud.abstract_repository import AbstractRepository
from src.models.product import ProductIn, ProductOut
from src.schemas.product import Product as ProductDBModel


class ProductRepository(AbstractRepository[ProductIn, ProductDBModel, ProductOut]):
    """Repository para gerenciar operações de CRUD de produtos"""

    async def get_all(self) -> list[ProductOut]:
        """get all prods"""
        result = await self.db_session.execute(select(ProductDBModel))
        products = result.scalars().all()
        return [ProductOut.model_validate(prod) for prod in products]

    async def get_one(self, _id: str) -> ProductOut:
        """Get one product by UUID"""
        result = await self.db_session.execute(
            select(ProductDBModel).where(ProductDBModel.id == UUID(_id, version=4))
        )
        product = result.scalar_one_or_none()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return ProductOut.model_validate(product)

    async def get_many(
        self,
        *,
        name: Optional[str] = None,
        description: Optional[str] = None,
        brand: Optional[str] = None,
        product_type: Optional[
            Literal["chopp", "wine", "beer", "sparkling", "whiskey"]
        ] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        skip: int | None = 0,
        limit: int = 10,
    ) -> list[ProductOut]:
        """Obtain a list of products with filters"""
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

        result = await self.db_session.execute(query)
        products = result.scalars().all()
        if not products:
            raise HTTPException(status_code=404, detail="No products found")
        return [ProductOut.model_validate(product) for product in products]

    async def create_one(self, data: ProductIn) -> ProductOut:
        raise NotImplementedError("Not implemented method")

    async def update_one(self, item_id: str, data: ProductIn) -> ProductOut:
        raise NotImplementedError("Not implemented method")

    async def delete_one(self, item_id: str) -> ProductOut:
        raise NotImplementedError("Not implemented method")
