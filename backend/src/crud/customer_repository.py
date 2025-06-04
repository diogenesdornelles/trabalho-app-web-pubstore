"""Repositório para clientes"""

from uuid import UUID

from fastapi import HTTPException
from sqlalchemy import select

from src.crud.abstract_repository import AbstractRepository
from src.models.customer import CustomerIn, CustomerInDB, CustomerOut
from src.schemas.customer import Customer as CustomerDBModel


class CustomerRepository(AbstractRepository[CustomerIn, CustomerDBModel, CustomerOut]):
    """Repository for customers
    This repository is used to interact with the customers table in the database."""

    async def get_all(self) -> list[CustomerOut]:
        """Get all customers"""
        raise NotImplementedError("Not implemented method")

    async def get_one(self, _id: str) -> CustomerOut:
        """Get one customer by id"""
        if not _id:
            raise HTTPException(status_code=400, detail="id is required")
        result = await self.db_session.execute(
            select(CustomerDBModel).where(CustomerDBModel.id == UUID(_id, version=4))
        )
        customer: CustomerDBModel | None = result.scalar_one_or_none()
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")
        return CustomerOut.model_validate(customer)

    async def get_one_for_auth(self, cpf: str) -> CustomerInDB:
        """Get one customer by cpf for authentication"""
        if not cpf:
            raise HTTPException(status_code=400, detail="CPF is required")
        result = await self.db_session.execute(
            select(CustomerDBModel).where(CustomerDBModel.cpf == cpf)
        )
        customer: CustomerDBModel | None = result.scalar_one_or_none()
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found")
        return CustomerInDB.model_validate(customer)

    async def create_one(self, data: CustomerIn) -> CustomerOut:
        raise NotImplementedError("Not implemented method")

    async def update_one(self, item_id: str, data: CustomerIn) -> CustomerOut:
        raise NotImplementedError("Not implemented method")

    async def delete_one(self, item_id: str) -> CustomerOut:
        raise NotImplementedError("Not implemented method")
