"""Utility function to validate UUID4 strings"""

import uuid


def is_valid_uuid4(value: str) -> str:
    """
    Valida um UUID4

    Args:
        value: uma string ou um próprio UUID4

    Raises:
        ValueError: Não é UUID4 válido

    Returns:
        str: String que representa o UUID4 válido
    """
    try:
        uuid_obj = uuid.UUID(str(value), version=4)
        if uuid_obj.version != 4:
            raise ValueError("UUID must be version 4")
        return str(uuid_obj)
    except (ValueError, AttributeError, TypeError):
        raise ValueError("Invalid UUID4")
