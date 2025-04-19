""" Módulo generate_random_string"""
import random
import string


def generate_random_string(length: int) -> str:
    """Gera uma string randomica

    Args:
        length (int): tamanho da str

    Returns:
        (str):string
    """
    characters = string.ascii_letters + string.digits
    random_string = "".join(random.choices(characters, k=length))
    return random_string
