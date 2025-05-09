"""Repositório para clientes"""

from fastapi import HTTPException

from src.crud.abstract_repository import AbstractRepository
from src.models.product_ordered import ProductOrderedIn, ProductOrderedOut
from src.schemas.product_ordered import ProductOrdered as ProductOrderedDBModel
from src.crud.product_repository import ProductRepository


class ProductOrderedRepository(
    AbstractRepository[ProductOrderedIn, ProductOrderedDBModel, ProductOrderedOut]
):
    """Repositório para gerenciar operações de CRUD de clientes"""

    async def get_all(self) -> list[ProductOrderedOut]:
        """Get all customers"""
        raise NotImplementedError("Not implemented method")

    async def get_one(self, key: str) -> ProductOrderedOut:
        """Get all customers"""
        raise NotImplementedError("Not implemented method")

    async def create(self, data: ProductOrderedIn) -> ProductOrderedOut:
        """
        Cria um novo pedido no banco de dados

        Args:
            data: Dados do pedido a ser criado

        Returns:
            ProductOrderedOut: O pedido criado, convertido para o modelo de saída

        Raises:
            HTTPException: Em caso de erro na criação do pedido
        """
        try:
            # query para obter o produto
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

            # Adicionar ao banco e realizar commit
            self.db_session.add(new_prod_ordered)
            await self.db_session.commit()

            # Converter e retornar
            return ProductOrderedOut.model_validate(new_prod_ordered)
        except Exception as e:
            # Fazer rollback em caso de erros
            await self.db_session.rollback()
            raise HTTPException(
                status_code=500, detail=f"Erro ao criar pedido: {str(e)}"
            ) from e

    async def update(self, item_id: str, data: ProductOrderedIn) -> ProductOrderedOut:
        raise NotImplementedError("Not implemented method")

    async def delete(self, item_id: str) -> None:
        raise NotImplementedError("Not implemented method")
