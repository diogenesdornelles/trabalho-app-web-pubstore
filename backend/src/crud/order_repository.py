"""Repositório para clientes"""

from uuid import UUID

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.orm import joinedload

from src.crud.abstract_repository import AbstractRepository
from src.models.order import OrderIn, OrderOut, OrderUpdate
from src.schemas.order import Order as OrderDBModel


class OrderRepository(AbstractRepository[OrderIn, OrderDBModel, OrderOut]):
    """Repository for orders
    This repository is used to interact with the orders table in the database."""

    async def get_all(self) -> list[OrderOut]:
        raise NotImplementedError("Not implemented method")

    async def get_one(self, _id: str) -> OrderOut:
        """Get one order by id"""
        if not _id:
            raise HTTPException(status_code=400, detail="id is required")
        stmt = (
            select(OrderDBModel)
            .where(OrderDBModel.id == UUID(_id, version=4))
            .options(joinedload(OrderDBModel.ordered_products))
        )
        result = await self.db_session.execute(stmt)
        order: OrderDBModel | None = result.unique().scalar_one_or_none()
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return OrderOut.model_validate(order)

    async def get_by_customer_id(self, customer_id: str) -> list[OrderOut]:
        """Get all orders by customer id with their products"""
        if not customer_id:
            raise HTTPException(status_code=400, detail="customer_id is required")

        stmt = (
            select(OrderDBModel)
            .where(OrderDBModel.customer_id == UUID(customer_id, version=4))
            .options(joinedload(OrderDBModel.ordered_products))
        )

        result = await self.db_session.execute(stmt)
        orders: list[OrderDBModel] = list(result.unique().scalars().all())

        return [
            OrderOut.model_validate(order)
            for order in orders
            if len(order.ordered_products) > 0
        ]

    async def create_one(self, data: OrderIn) -> OrderOut:
        """Create a new order"""
        try:
            new_order = OrderDBModel(customer_id=data.customer_id)
            self.db_session.add(new_order)
            await self.db_session.commit()
            await self.db_session.refresh(new_order)
            await self.db_session.execute(
                select(OrderDBModel)
                .where(OrderDBModel.id == new_order.id)
                .options(joinedload(OrderDBModel.ordered_products))
            )
            return OrderOut.model_validate(new_order)
        except Exception as e:
            await self.db_session.rollback()
            raise HTTPException(
                status_code=500, detail=f"Erro ao criar pedido: {str(e)}"
            ) from e

    async def update_one(self, item_id: str, data: OrderUpdate) -> OrderOut:
        """Update an order by id"""
        if not item_id:
            raise HTTPException(status_code=400, detail="id is required")
        try:
            stmt = select(OrderDBModel).where(
                OrderDBModel.id == UUID(item_id, version=4)
            )
            result = await self.db_session.execute(stmt)
            order: OrderDBModel | None = result.scalar_one_or_none()
            if not order:
                raise HTTPException(status_code=404, detail="Order not found")

            for field, value in data.model_dump(exclude_unset=True).items():
                setattr(order, field, value)

            await self.db_session.commit()
            await self.db_session.refresh(order)
            await self.db_session.execute(
                select(OrderDBModel)
                .where(OrderDBModel.id == order.id)
                .options(joinedload(OrderDBModel.ordered_products))
            )
            return OrderOut.model_validate(order)
        except Exception as e:
            await self.db_session.rollback()
            raise HTTPException(
                status_code=500, detail=f"Erro ao atualizar pedido: {str(e)}"
            ) from e

    async def delete_one(self, item_id: str) -> OrderOut:
        """Delete an order by id"""
        if not item_id:
            raise HTTPException(status_code=400, detail="id is required")
        try:
            stmt = select(OrderDBModel).where(
                OrderDBModel.id == UUID(item_id, version=4)
            )
            result = await self.db_session.execute(stmt)
            order: OrderDBModel | None = result.scalar_one_or_none()
            if not order:
                raise HTTPException(status_code=404, detail="Order not found")
            await self.db_session.delete(order)
            await self.db_session.commit()
            return OrderOut.model_validate(order)
        except Exception as e:
            await self.db_session.rollback()
            raise HTTPException(
                status_code=500, detail=f"Erro ao deletar pedido: {str(e)}"
            ) from e
