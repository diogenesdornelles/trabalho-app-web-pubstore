from datetime import datetime
from typing import Literal, Self

from pydantic import UUID4, BaseModel, Field, model_validator


class Product(BaseModel):
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


class ProductQuery(BaseModel):
    name: str | None = Field(min_length=3, description="Product name")
    description: str | None = Field(min_length=3, description="Product description")
    brand: str | None = Field(min_length=3, description="Product brand")
    min_price: float | None = Field(gt=0, description="Product min. price")
    max_price: float | None = Field(gt=0, description="Product max. price")
    type: Literal["chopp", "wine", "drink", "sparkling"] | None = Field(
        description="Product type"
    )

    @model_validator(mode="after")
    def email_must_be_valid(self) -> Self:
        if (self.min_price and self.max_price) and self.min_price > self.max_price:
            raise ValueError("Min. price must be greater than max.")
        return self
