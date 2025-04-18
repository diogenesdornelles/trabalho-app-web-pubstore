from typing import Self

from pydantic import UUID4, BaseModel, Field, model_validator

from utils.cpf_validator import CpfValidator


class Costumer(BaseModel):
    id: UUID4 = Field(min_length=3, description="Costumer id")
    name: str = Field(min_length=3, description="Costumer name")
    cpf: str = Field(description="Costumer cpf")
    password: str = Field(description="Costumer password")


class CostumerAuth(BaseModel):
    password: str = Field(description="Costumer password")
    cpf: str = Field(description="Costumer cpf")

    @model_validator(mode='after')
    def cpf_must_be_valid(self) -> Self:
        is_valid = CpfValidator(self.cpf).is_valid()
        if not is_valid:
            raise ValueError('Cpf must be valid')
        return self
