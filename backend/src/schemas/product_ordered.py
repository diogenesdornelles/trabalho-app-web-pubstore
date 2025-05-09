"""Tabela ProductOrdered"""

import uuid
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime
from sqlalchemy import Enum as SqlEnum
from sqlalchemy import ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from src.models.product import TypeEnum
from src.schemas.base import Base


class ProductOrdered(Base):
    """Produto como foi ordenado no momento da compra
    Preserva informações históricas como preço e descrição
    """

    __tablename__ = "product_ordered"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        nullable=False,
    )
    # Referência ao produto original
    product_id = Column(
        UUID(as_uuid=True),
        ForeignKey("product.id"),  # Referência ao produto original
        nullable=False,
        index=True,
    )
    # Referência ao pedido
    order_id = Column(
        UUID(as_uuid=True),
        ForeignKey("order.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    # Dados do produto no momento da compra
    name = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    price = Column(Numeric(10, 2), nullable=False)
    type = Column(SqlEnum(TypeEnum), nullable=False)
    quantity = Column(Integer, nullable=False, default=1)
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now(timezone.utc),
    )

    # Relacionamentos
    order = relationship("Order", back_populates="ordered_products")
    original_product = relationship("Product")
