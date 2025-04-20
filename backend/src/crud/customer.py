from fastapi import HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.schemas.customer import Customer as CustomerDBModel


async def get_one(db_session: AsyncSession, customer_id: str) -> CustomerDBModel:
    customer = (
        await db_session.scalars(
            select(CustomerDBModel).where(CustomerDBModel.id == customer_id)
        )
    ).first()
    if not customer:
        raise HTTPException(status_code=404, detail="User not found")
    return customer
