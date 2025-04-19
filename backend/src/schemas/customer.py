import uuid

from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID

from src.config.base import Base  # importa o Base refatorado


class Customer(Base):
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
    cpf = Column(String(11), unique=True, index=True)
    password = Column(String(128))
