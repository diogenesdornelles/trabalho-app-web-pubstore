"""Pydantic classes para produto pedido"""

from datetime import datetime
from typing import Annotated

from pydantic import UUID4, AfterValidator, BaseModel, ConfigDict, Field

from src.models.product import TypeEnum
from src.utils.is_valid_uuid4 import is_valid_uuid4


class ProductOrderedBase(BaseModel):
    """Classe core de produto pedido

    Args:
        BaseModel (_type_): BaseModel de pydantic

    Returns:
        _type_: None
    """

    quantity: int = Field(ge=0, description="Product stock quantity")

    model_config = ConfigDict(from_attributes=True)


class ProductOrderedIn(ProductOrderedBase):
    """Produto pedido para criação"""

    product_id: Annotated[str, AfterValidator(is_valid_uuid4)]
    order_id: Annotated[str, AfterValidator(is_valid_uuid4)]


class ProductOrderedInDB(ProductOrderedIn):
    """Validador de produto pedido no Db"""

    id: UUID4 = Field(description="Product id")
    product_id: UUID4 = Field(description="Product id")
    order_id: UUID4 = Field(description="Order id")
    name: str = Field(min_length=3, description="Product name")
    description: str = Field(min_length=3, description="Product description")
    price: float = Field(ge=0, description="Product price")
    type: TypeEnum = Field(
        description="Product type must be chopp, wine, beer, whiskey or sparkling"
    )
    created_at: datetime | None = Field(
        default=None, description="Product image source"
    )


class ProductOrderedOut(ProductOrderedInDB):
    """Classe de resposta para um produto pedido"""
