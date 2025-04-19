from typing import Self

from pydantic import UUID4, BaseModel, ConfigDict, Field, model_validator

from utils.cpf_validator import CpfValidator


class CustomerCreate(BaseModel):
    name: str = Field(..., min_length=3, description="Customer name")
    cpf: str = Field(..., description="Customer CPF")
    password: str = Field(..., description="Customer password")


class CustomerRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID4 = Field(..., description="Customer ID")
    name: str = Field(..., min_length=3, description="Customer name")
    cpf: str = Field(..., description="Customer CPF")


class CustomerAuth(BaseModel):
    password: str = Field(description="Costumer password")
    cpf: str = Field(description="Costumer cpf")

    @model_validator(mode="after")
    def cpf_must_be_valid(self) -> Self:
        is_valid = CpfValidator(self.cpf).is_valid()
        if not is_valid:
            raise ValueError("Cpf must be valid")
        return self
