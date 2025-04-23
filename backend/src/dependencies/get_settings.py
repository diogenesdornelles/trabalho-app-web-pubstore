"""get settings"""
from functools import lru_cache

from settings import Settings


@lru_cache
def get_settings() -> Settings:
    """Retorna variáveis de ambiente

    Returns:
        _type_: _description_
    """
    return Settings()  # type: ignore
