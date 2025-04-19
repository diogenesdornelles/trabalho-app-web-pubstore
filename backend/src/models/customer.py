""" Pydantic classes para customer"""
from datetime import datetime
from typing import Self

from pydantic import UUID4, BaseModel, ConfigDict, Field, model_validator

from src.utils.cpf_validator import CpfValidator


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
    cpf: str = Field(..., description="Customer CPF")

    @model_validator(mode="after")
    def cpf_must_be_valid(self) -> Self:
        """Validar o CPF

        Raises:
            ValueError: cpf inválido

        Returns:
            Self: objeto
        """
        is_valid = CpfValidator(self.cpf).is_valid()
        if not is_valid:
            raise ValueError("Cpf must be valid")
        return self


class CustomerIn(CustomerBase):
    """Classe de criação para cliente

    Args:
        CustomerBase (BaseModel): Classe core de Customer
    """
    password: str = Field(..., description="Customer password")


class CustomerInDB(CustomerBase):
    """Classe de cliente no DB

    Args:
        CustomerBase (BaseModel): Classe core de Customer
    """
    id: UUID4 = Field(..., description="Customer ID")
    created_at: datetime | None = Field(
        default=None, description="Product image source"
    )


class CustomerOut(CustomerInDB):
    """Classe de resposta para um produto

    Args:
        CustomerInDB (BaseModel): Classe core de Customer
    """
    model_config = ConfigDict(from_attributes=True)


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
    cpf: str = Field(description="Costumer cpf")

    @model_validator(mode="after")
    def cpf_must_be_valid(self) -> Self:
        """Validar o CPF

        Raises:
            ValueError: cpf inválido

        Returns:
            Self: objeto
        """
        is_valid = CpfValidator(self.cpf).is_valid()
        if not is_valid:
            raise ValueError("Cpf must be valid")
        return self
