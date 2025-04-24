"""CRUD para clientes"""

from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from src.models.customer import CustomerInDB
from src.schemas.customer import Customer as CustomerDBModel


async def get_one(db_session: AsyncSession, cpf: str) -> CustomerInDB:
    """Obter um cliente pelo ID"""
    result = await db_session.execute(
        select(CustomerDBModel).where(
            CustomerDBModel.cpf == cpf
        )
    )
    customer: CustomerDBModel | None = result.scalar_one_or_none()
    if not customer:
        raise HTTPException(status_code=404, detail="User not found")
    return CustomerInDB.model_validate(customer)
