from datetime import datetime
from typing import Literal

from pydantic import UUID4, BaseModel, ConfigDict, Field


class ProductCreate(BaseModel):
    name: str = Field(min_length=3, description="Product name")
    brand: str = Field(min_length=3, description="Product brand")
    description: str = Field(min_length=3, description="Product description")
    price: float = Field(gt=0, description="Product price")
    alcohol_content: float = Field(gt=0, description="Product alcohol content")
    ibu: float = Field(gt=0, description="Product ibu")
    type: Literal["chopp", "wine", "drink", "sparkling"]
    disponible: bool = Field(description="Product disponibility")
    quantity: int = Field(gt=0, description="Product stock quantity")
    volume: float = Field(gt=0, description="Product volume")
    source: str | None = Field(default=None, description="Product image source")


class ProductRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID4 = Field(description="Product id")
    name: str = Field(min_length=3, description="Product name")
    brand: str = Field(min_length=3, description="Product brand")
    description: str = Field(min_length=3, description="Product description")
    price: float = Field(gt=0, description="Product price")
    alcohol_content: float = Field(gt=0, description="Product alcohol content")
    ibu: float = Field(gt=0, description="Product ibu")
    type: Literal["chopp", "wine", "drink", "sparkling"]
    disponible: bool = Field(description="Product disponibility")
    quantity: int = Field(gt=0, description="Product stock quantity")
    volume: float = Field(gt=0, description="Product volume")
    created_at: datetime | None = Field(
        default=None, description="Product image source"
    )
    source: str | None = Field(default=None, description="Product image source")
