""" Módulo hash_value"""
import bcrypt


def get_pwd_hash(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


