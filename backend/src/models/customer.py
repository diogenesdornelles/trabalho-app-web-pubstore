"""Pydantic classes para customer"""

from datetime import datetime
from typing import Annotated

from pydantic import UUID4, AfterValidator, BaseModel, ConfigDict, Field, EmailStr

from src.utils.is_valid_cpf import is_valid_cpf


class CustomerBase(BaseModel):
    """Classe core de Customer

    Args:
        BaseModel (_type_): BaseModel de pydantic

    Raises:
        ValueError: cpf inválido

    Returns:
        _type_: None
    """

    name: str = Field(..., min_length=3, description="Customer name")
    cpf: Annotated[str, AfterValidator(is_valid_cpf)]
    address: str = Field(..., description="Customer address")
    email: EmailStr = Field(..., description="Customer email")

    model_config = ConfigDict(from_attributes=True)


class CustomerIn(CustomerBase):
    """Classe de criação para cliente

    Args:
        CustomerBase (BaseModel): Classe core de Customer
    """

    password: str = Field(..., description="Customer password")


class CustomerInDB(CustomerIn):
    """Classe de cliente no DB

    Args:
        CustomerBase (BaseModel): Classe core de Customer
    """

    id: UUID4 = Field(..., description="Customer ID")
    created_at: datetime | None = Field(default=None, description="Created at date")


class CustomerOut(CustomerInDB):
    """Classe de resposta para um produto

    Args:
        CustomerInDB (BaseModel): Classe core de Customer
    """


class CustomerAuth(BaseModel):
    """Classe de validação p/ autenticação

    Args:
        BaseModel (_type_): Pydantic base class

    Raises:
        ValueError: cpf inválido

    Returns:
        _type_: None
    """

    password: str = Field(description="Costumer password")
    cpf: Annotated[str, AfterValidator(is_valid_cpf)]
