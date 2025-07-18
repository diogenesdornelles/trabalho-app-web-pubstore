"""Abstract repository class for CRUD operations."""

from abc import ABC, abstractmethod
from typing import Generic, TypeVar

from sqlalchemy.ext.asyncio import AsyncSession

In = TypeVar("In")
Out = TypeVar("Out")
Db = TypeVar("Db")


class AbstractRepository(ABC, Generic[In, Db, Out]):
    """Abstract class for database repositories."""

    def __init__(self, db_session: AsyncSession):
        """
        Args:
            db_session (AsyncSession): Db session for database operations.
        """
        self.db_session = db_session

    @abstractmethod
    async def get_all(self) -> list[Out]:
        """Get all records"""
        pass

    @abstractmethod
    async def get_one(self, _id: str) -> Out:
        """Get one record by key"""
        pass

    @abstractmethod
    async def create_one(self, data: In) -> Out:
        """Create a new record"""
        pass

    @abstractmethod
    async def update_one(self, item_id: str, data: In) -> Out:
        """Update an existing record"""
        pass

    @abstractmethod
    async def delete_one(self, item_id: str) -> Out:
        """Delete a record"""
        pass
