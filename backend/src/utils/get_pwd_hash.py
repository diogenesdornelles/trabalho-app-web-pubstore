"""Módulo hash_value"""

import bcrypt


def get_pwd_hash(password: str) -> str:
    """Gera um hash de senha usando bcrypt."""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
