"""Modulo que objetiva perfomar migrações"""

from typing import Sequence

from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from src.config.get_db_session import sessionmanager
from src.schemas.base import Base


class GenerateSeed:
    """Seeds the database with initial data."""

    def __init__(self, objs: Sequence[BaseModel], table: Base, key: str):
        self.objs = objs
        self.sessionmanager = sessionmanager
        self.table = table
        self.key = key

    async def check_if_exists(self, session: AsyncSession, obj: BaseModel) -> bool:
        """Verifica se já existe no db"""
        query = select(self.table).where(  # type: ignore
            getattr(self.table, self.key) == getattr(obj, self.key)
        )
        print(getattr(obj, self.key))
        result = await session.execute(query)
        saved = result.scalars().first()
        return bool(saved)

    async def save(self, session: AsyncSession, obj: BaseModel) -> None:
        """Salva o item junto ao db"""
        new_entry = self.table(**obj.model_dump())  # type: ignore
        session.add(new_entry)

    async def start(self):
        """Inicia a o processo de seed"""
        if len(self.objs) > 0:
            async with self.sessionmanager.session() as session:
                for obj in self.objs:
                    if not await self.check_if_exists(session, obj):
                        await self.save(session, obj)
                        print(
                            f"Record key {self.key} value {getattr(obj, self.key)} saved"
                        )
                    else:
                        print(
                            f"Record key {self.key} value {getattr(obj, self.key)} already inserted"
                        )
                # Confirma a transação
                await session.commit()
        else:
            print("Nothing to do here...")
