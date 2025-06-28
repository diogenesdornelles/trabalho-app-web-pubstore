"""Pydantic classes para pedido"""

from datetime import datetime
from enum import Enum
from typing import Annotated

from pydantic import UUID4, AfterValidator, BaseModel, ConfigDict, Field

from src.models.product_ordered import ProductOrderedOut
from src.utils.is_valid_uuid4 import is_valid_uuid4


class PaymentStatusEnum(str, Enum):
    """Enum para o tipo de produto

    Args:
        str (_type_):
        Enum (_type_):
    """

    paid = "paid"
    pending = "pending"
    cancelled = "cancelled"
    refunded = "refunded"
    chargeback = "chargeback"


class OrderBase(BaseModel):
    """Classe core de Pedido

    Args:
        BaseModel (_type_): BaseModel de pydantic

    Returns:
        _type_: None
    """

    model_config = ConfigDict(from_attributes=True)


class OrderIn(OrderBase):
    """Classe de criação para pedido"""

    customer_id: Annotated[str, AfterValidator(is_valid_uuid4)]


class OrderInDB(OrderBase):
    """Validador de Order no Db"""

    id: UUID4 = Field(description="Order id")
    customer_id: UUID4 = Field(description="Customer id")
    payment_status: PaymentStatusEnum = Field(
        description="Order payment status must be paid, pending, cancelled, refunded or chargeback",
        default=PaymentStatusEnum.pending,
    )
    created_at: datetime | None = Field(default=None, description="Created at date")


class OrderUpdate(OrderBase):
    """Classe de atualização para pedido"""

    payment_status: PaymentStatusEnum = Field(
        description="Order payment status must be paid, pending, cancelled, refunded or chargeback",
        default=PaymentStatusEnum.pending,
    )


class OrderOut(OrderInDB):
    """Classe de resposta para um pedido"""

    ordered_products: list[ProductOrderedOut] = Field(
        default_factory=list, description="Products in this order"
    )
