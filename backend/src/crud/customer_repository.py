"""Repositório para clientes"""
from fastapi import HTTPException
from sqlalchemy import select

from src.crud.abstract_repository import AbstractRepository
from src.models.customer import CustomerInDB, CustomerOut, CustomerIn
from src.schemas.customer import Customer as CustomerDBModel


class CustomerRepository(AbstractRepository[CustomerIn, CustomerDBModel, CustomerOut]):
    """Repositório para gerenciar operações de CRUD de clientes"""

    async def get_all(self) -> list[CustomerOut]:
        """Get all customers"""
        raise NotImplementedError("Not implemented method")

    async def get_one(self, key: str) -> CustomerOut:
        """Get one customer by CPF"""
        if not key:
            raise HTTPException(status_code=400, detail="Key is required")
        result = await self.db_session.execute(
            select(CustomerDBModel).where(CustomerDBModel.cpf == key)
        )
        customer: CustomerDBModel | None = result.scalar_one_or_none()
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")
        return CustomerOut.model_validate(customer)

    async def get_one_for_auth(self, key: str) -> CustomerInDB:
        """Get one customer by CPF"""
        if not key:
            raise HTTPException(status_code=400, detail="Key is required")
        result = await self.db_session.execute(
            select(CustomerDBModel).where(CustomerDBModel.cpf == key)
        )
        customer: CustomerDBModel | None = result.scalar_one_or_none()
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")
        return CustomerInDB.model_validate(customer)

    async def create(self, data: CustomerIn) -> CustomerOut:
        raise NotImplementedError("Not implemented method")

    async def update(self, item_id: str, data: CustomerIn) -> CustomerOut:
        raise NotImplementedError("Not implemented method")

    async def delete(self, item_id: str) -> None:
        raise NotImplementedError("Not implemented method")
