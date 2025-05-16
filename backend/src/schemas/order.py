"""Tabela Orders"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime
from sqlalchemy import Enum as SqlEnum
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from src.models.order import PaymentStatusEnum
from src.schemas.base import Base


class Order(Base):
    """Tabela customer

    Args:
        Base (_type_): Sql Alchemy declarative base class
    """

    __tablename__ = "order"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True,
        nullable=False,
    )
    payment_status = Column(
        SqlEnum(PaymentStatusEnum),
        nullable=False,
        default=PaymentStatusEnum.pending,
    )
    customer_id = Column(
        UUID(as_uuid=True),
        ForeignKey("customer.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now(timezone.utc),
    )
    customer = relationship("Customer", back_populates="orders")
    ordered_products = relationship(
        "ProductOrdered", back_populates="order", cascade="all, delete-orphan"
    )
