"""Dados para migração de cliente"""

from src.models.customer import CustomerIn
from src.utils.get_pwd_hash import get_pwd_hash
from src.utils.get_settings import get_settings

settings = get_settings()

customers = [
    CustomerIn(
        name="first",
        cpf=settings.SUPER_USER_COD,
        password=get_pwd_hash(settings.SUPER_USER_PWD),
    )
]
