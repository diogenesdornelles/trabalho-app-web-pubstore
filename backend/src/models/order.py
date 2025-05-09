"""Pydantic classes para pedido"""

from datetime import datetime
from typing import Annotated

from pydantic import UUID4, AfterValidator, BaseModel, ConfigDict, Field

from models.product_ordered import ProductOrderedOut
from src.utils.is_valid_uuid4 import is_valid_uuid4


class OrderBase(BaseModel):
    """Classe core de Pedido

    Args:
        BaseModel (_type_): BaseModel de pydantic

    Returns:
        _type_: None
    """

    customer_id: Annotated[UUID4, AfterValidator(is_valid_uuid4)]

    model_config = ConfigDict(from_attributes=True)


class OrderIn(OrderBase):
    """Classe de criação para pedido"""


class OrderInDB(OrderBase):
    """Validador de Order no Db"""

    id: UUID4 = Field(description="Order id")
    created_at: datetime | None = Field(default=None, description="Created at date")


class OrderOut(OrderInDB):
    """Classe de resposta para um pedido"""

    ordered_products: list[ProductOrderedOut] = Field(
        default_factory=list, description="Products in this order"
    )
