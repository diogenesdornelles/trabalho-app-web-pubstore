"""Dados para migração de cliente"""

from src.dependencies.get_pwd_hash import get_pwd_hash
from src.models.customer import CustomerIn
from src.dependencies.get_settings import get_settings

settings = get_settings()

costumers = [
    CustomerIn(
        name="first",
        cpf=settings.SUPER_USER_COD,
        password=get_pwd_hash(settings.SUPER_USER_PWD),
    )
]
