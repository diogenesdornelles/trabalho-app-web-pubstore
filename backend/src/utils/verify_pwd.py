"""Módulo verify_hashed_value"""

import bcrypt


def verify_pwd(plain_password: str, hashed_password: str) -> bool:
    """Verifica se a senha em texto simples corresponde ao hash armazenado."""
    return bcrypt.checkpw(
        plain_password.encode("utf-8"), hashed_password.encode("utf-8")
    )
