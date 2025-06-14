"""Tabela Customer"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from src.schemas.base import Base


class Customer(Base):
    """Tabela customer

    Args:
        Base (_type_): Sql Alchemy declarative base class
    """

    __tablename__ = "customer"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True,
        nullable=False,
    )
    name = Column(String(50), nullable=False)
    cpf = Column(String(11), unique=True, index=True, nullable=False)
    email = Column(String(60), unique=True, index=True, nullable=False)
    address = Column(String(160), nullable=False)
    password = Column(String(128))
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now(timezone.utc),
    )
    orders = relationship(
        "Order", back_populates="customer", cascade="all, delete-orphan"
    )
