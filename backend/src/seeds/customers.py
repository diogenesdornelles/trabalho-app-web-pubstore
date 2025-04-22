"""Dados para migração de cliente"""
from src.dependencies.get_pwd_hash import get_pwd_hash
from src.models.customer import CustomerIn

costumers = [
    CustomerIn(name="first", cpf="00480171084", password=get_pwd_hash("123456"))
]
