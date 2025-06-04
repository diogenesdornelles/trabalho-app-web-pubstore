"""Database manager"""

import contextlib
from typing import Any, AsyncIterator

from sqlalchemy.ext.asyncio import (
    AsyncConnection,
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)


class DatabaseSessionManager:
    """Gerencia a conexão com o banco de dados"""

    def __init__(self, host: str, engine_kwargs: dict[str, Any] | None = None):
        """construtor

        Args:
            host (str): _description_
            engine_kwargs (dict[str, Any], optional): _description_. Defaults to {}.
        """
        self._engine = None
        self._sessionmaker = None
        if engine_kwargs is not None:
            self._engine = create_async_engine(host, **engine_kwargs)
            self._sessionmaker = async_sessionmaker(autocommit=False, bind=self._engine)

    @property
    def engine(self) -> AsyncEngine | None:
        """_engine property"""
        return self._engine

    async def close(self):
        """Encerra a conexão"""
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")
        await self._engine.dispose()

        self._engine = None
        self._sessionmaker = None

    @contextlib.asynccontextmanager
    async def connect(self) -> AsyncIterator[AsyncConnection]:
        """Estabelece a conexão"""
        if self._engine is None:
            raise Exception("DatabaseSessionManager is not initialized")

        async with self._engine.begin() as connection:
            try:
                yield connection
            except Exception:
                await connection.rollback()
                raise

    @contextlib.asynccontextmanager
    async def session(self) -> AsyncIterator[AsyncSession]:
        """Retorna uma sessão"""
        if self._sessionmaker is None:
            raise Exception("DatabaseSessionManager is not initialized")

        session = self._sessionmaker()
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
