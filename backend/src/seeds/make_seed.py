"""Modulo que objetiva perfomar migrações"""

from typing import Sequence

from pydantic import BaseModel
from sqlalchemy.future import select
from src.schemas.base import Base
from src.config.get_db_session import sessionmanager

class MakeSeed:
    """Popula tabelas, de acordo com uma lista de objetos e uma key para verificar repetição"""

    def __init__(self, objs: Sequence[BaseModel], table: Base, key: str):
        self.objs = objs
        self.sessionmanager = sessionmanager
        self.table = table
        self.key = key

    async def start(self):
        """Inicia a o processo de seed"""
        if len(self.objs) > 0:
            async with self.sessionmanager.session() as session:
                for obj in self.objs:
                    # Verifica se o registro já existe no banco de dados
                    query = select(self.table).where(
                        getattr(self.table, self.key) == getattr(obj, self.key)
                    )
                    result = await session.execute(query)
                    saved = result.scalars().first()

                    if not saved:
                        # Cria uma nova instância do modelo SQLAlchemy
                        new_entry = self.table(**obj.model_dump())
                        session.add(new_entry)
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
