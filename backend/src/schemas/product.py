import enum
import uuid
from datetime import datetime, timezone

from sqlalchemy import (Boolean, Column, DateTime, Integer, Numeric, String,
                        Text)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped

from src.config.base import Base


class ProductType(enum.Enum):
    chopp = "chopp"
    wine = "wine"
    drink = "drink"
    sparkling = "sparkling"


class Product(Base):
    __tablename__ = "products"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        unique=True,
        index=True,
        nullable=False,
    )
    name = Column(String(100), nullable=False)
    brand = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    price = Column(Numeric(10, 2), nullable=False)
    alcohol_content = Column(Numeric(5, 2), nullable=False)
    ibu = Column(Numeric(5, 2), nullable=False)
    type: Mapped[ProductType]
    disponible = Column(Boolean, nullable=False, default=True)
    quantity = Column(Integer, nullable=False)
    volume = Column(Numeric(10, 2), nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        nullable=False,
        default=datetime.now(timezone.utc),
    )
    source = Column(String(255), nullable=True)
