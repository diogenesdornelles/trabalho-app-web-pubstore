""" Módulo hash_value"""
from passlib.hash import bcrypt


def hash_value(value: str) -> str:
    """Realiza o hash de um valor

    Args:
        value (str): valor a ser hasheado

    Returns:
        str: valor hasheado
    """
    hashed = bcrypt.hash(value)
    return hashed
