"""Repositório para clientes"""

from fastapi import HTTPException

from src.crud.abstract_repository import AbstractRepository
from src.crud.product_repository import ProductRepository
from src.models.product_ordered import ProductOrderedIn, ProductOrderedOut
from src.schemas.product_ordered import ProductOrdered as ProductOrderedDBModel


class ProductOrderedRepository(
    AbstractRepository[ProductOrderedIn, ProductOrderedDBModel, ProductOrderedOut]
):
    """Repositório para gerenciar operações de CRUD de clientes"""

    async def get_all(self) -> list[ProductOrderedOut]:
        """Get all customers"""
        raise NotImplementedError("Not implemented method")

    async def get_one(self, _id: str) -> ProductOrderedOut:
        """Get all customers"""
        raise NotImplementedError("Not implemented method")

    async def create(self, data: ProductOrderedIn) -> ProductOrderedOut:
        """
        Create a new order
        """
        try:
            prod_repo = ProductRepository(self.db_session)
            product = await prod_repo.get_one(data.product_id)

            new_prod_ordered = ProductOrderedDBModel(
                product_id=data.product_id,
                order_id=data.order_id,
                quantity=data.quantity,
                name=product.name,
                description=product.description,
                price=product.price,
                type=product.type,
            )

            self.db_session.add(new_prod_ordered)
            await self.db_session.commit()

            await self.db_session.refresh(new_prod_ordered)

            temp_prod = {
                "id": new_prod_ordered.id,
                "product_id": new_prod_ordered.product_id,
                "order_id": new_prod_ordered.order_id,
                "name": new_prod_ordered.name,
                "description": new_prod_ordered.description,
                "price": float(new_prod_ordered.price),
                "type": (
                    new_prod_ordered.type.value
                    if hasattr(new_prod_ordered.type, "value")
                    else new_prod_ordered.type
                ),
                "quantity": new_prod_ordered.quantity,
                "created_at": new_prod_ordered.created_at,
            }

            return ProductOrderedOut.model_validate(temp_prod)
        except Exception as e:
            # Fazer rollback em caso de erros
            await self.db_session.rollback()
            raise HTTPException(
                status_code=500, detail=f"Error on create order: {str(e)}"
            ) from e

    async def update(self, item_id: str, data: ProductOrderedIn) -> ProductOrderedOut:
        raise NotImplementedError("Not implemented method")

    async def delete(self, item_id: str) -> None:
        raise NotImplementedError("Not implemented method")
