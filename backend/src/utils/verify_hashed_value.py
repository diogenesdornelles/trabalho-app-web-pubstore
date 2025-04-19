"""Módulo verify_hashed_value"""

from passlib.hash import bcrypt


def verify_hashed_value(password: str, hashed_password: str) -> bool:
    """Compara senha raw com senha hasheada com bcrypt

    Args:
        password (str): senha raw
        hashed_password (str): senha hasheada

    Returns:
        bool: resultado da operação
    """
    is_valid = bcrypt.verify(password, hashed_password)
    return is_valid
