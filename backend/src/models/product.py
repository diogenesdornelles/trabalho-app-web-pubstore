"""Módulo: classes de validação pydantic para produto"""
from datetime import datetime
from enum import Enum

from pydantic import UUID4, BaseModel, ConfigDict, Field


class TypeEnum(str, Enum):
    """Enum para o tipo de produto

    Args:
        str (_type_):
        Enum (_type_):
    """
    chopp = "chopp"
    wine = "wine"
    beer = "beer"
    whiskey = "whiskey"
    sparkling = "sparkling"

class ProductBase(BaseModel):
    """Clases core de validação p/ produto

    Args:
        BaseModel (_type_): None
    """
    name: str = Field(min_length=3, description="Product name")
    brand: str = Field(min_length=3, description="Product brand")
    description: str = Field(min_length=3, description="Product description")
    price: float = Field(ge=0, description="Product price")
    alcohol_content: float = Field(gt=0, description="Product alcohol content")
    ibu: float = Field(ge=0, description="Product ibu")
    type: TypeEnum = Field(description="Product type must be chopp, wine, beer, whiskey or sparkling")
    disponible: bool = Field(description="Product disponibility")
    quantity: int = Field(ge=0, description="Product stock quantity")
    volume: float = Field(gt=0, description="Product volume")
    source: str | None = Field(default=None, description="Product image source")
    model_config = ConfigDict(from_attributes=True)

class ProductIn(ProductBase):
    """Validador de entrada para produto

    Args:
        ProductBase (_type_):
    """


class ProductInDB(ProductBase):
    """Validador de produto no Db

    Args:
        ProductBase (_type_):
    """
    id: UUID4 = Field(description="Product id")
    created_at: datetime | None = Field(
        default=None, description="Product image source"
    )


class ProductOut(ProductInDB):
    """Validador de produto para resposta

    Args:
        ProductInDB (_type_): _description_
    """
