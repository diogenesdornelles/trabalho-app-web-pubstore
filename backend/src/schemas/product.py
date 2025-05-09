"""Tabela Product"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Boolean, Column, DateTime
from sqlalchemy import Enum as SqlEnum
from sqlalchemy import Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID

from src.models.product import TypeEnum
from src.schemas.base import Base


class Product(Base):
    """_summary_

    Args:
        Base (_type_): Sql Alchemy declarative base class
    """

    __tablename__ = "product"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True,
        nullable=False,
    )
    name = Column(String(100), nullable=False, unique=True)
    brand = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    alcohol_content = Column(Numeric(5, 2), nullable=False)
    ibu = Column(
        Numeric(5, 2), nullable=False
    )  # qualificação de amargor em cerveja ou chopp. Marcar 0.0 para outros tipos.
    type = Column(SqlEnum(TypeEnum))
    disponible = Column(Boolean, nullable=False, default=True)
    quantity = Column(Integer, nullable=False)
    volume = Column(Numeric(10, 2), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now(timezone.utc),
    )
    source = Column(String(255), nullable=True)
