"""Repositório para clientes"""
from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.crud.abstract_repository import AbstractRepository
from src.models.order import OrderIn, OrderOut
from src.schemas.order import Order as OrderDBModel


class OrderRepository(AbstractRepository[OrderIn, OrderDBModel, OrderOut]):
    """Repositório para gerenciar operações de CRUD de clientes"""

    async def get_all(self) -> list[OrderOut]:
        """Get all customers"""
        raise NotImplementedError("Not implemented method")

    async def get_one(self, key: str) -> OrderOut:
        """Get one order by customer id"""
        if not key:
            raise HTTPException(status_code=400, detail="Key is required")
        result = await self.db_session.execute(
            select(OrderDBModel).where(OrderDBModel.id == key)
        )
        order: OrderDBModel | None = result.scalar_one_or_none()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return OrderOut.model_validate(order)

    async def get_by_customer_id(self, customer_id: str) -> list[OrderOut]:
        """Get all orders by customer id with their products"""
        if not customer_id:
            raise HTTPException(status_code=400, detail="customer_id is required")

        stmt = (
            select(OrderDBModel)
            .where(OrderDBModel.customer_id == customer_id)
            .options(joinedload(OrderDBModel.ordered_products))
        )

        result = await self.db_session.execute(stmt)
        orders: list[OrderDBModel] = result.unique().scalars().all()

        return [OrderOut.model_validate(order) for order in orders]

    async def create(self, data: OrderIn) -> OrderOut:
        """
        Cria um novo pedido no banco de dados

        Args:
            data: Dados do pedido a ser criado

        Returns:
            OrderOut: O pedido criado, convertido para o modelo de saída

        Raises:
            HTTPException: Em caso de erro na criação do pedido
        """
        try:
            # Criar objeto Order
            new_order = OrderDBModel(customer_id=data.customer_id)

            # Adicionar ao banco e realizar commit
            self.db_session.add(new_order)
            await self.db_session.commit()

            # Atualizar objeto com dados do banco (por exemplo, id gerado, timestamps, etc)
            await self.db_session.refresh(new_order)

            # Carregar relacionamentos para retornar
            await self.db_session.execute(
                select(OrderDBModel)
                .where(OrderDBModel.id == new_order.id)
                .options(joinedload(OrderDBModel.ordered_products))
            )

            # Converter e retornar
            return OrderOut.model_validate(new_order)
        except Exception as e:
            # Fazer rollback em caso de erros
            await self.db_session.rollback()
            raise HTTPException(
                status_code=500, detail=f"Erro ao criar pedido: {str(e)}"
            ) from e

    async def update(self, item_id: str, data: OrderIn) -> OrderOut:
        raise NotImplementedError("Not implemented method")

    async def delete(self, item_id: str) -> None:
        raise NotImplementedError("Not implemented method")
