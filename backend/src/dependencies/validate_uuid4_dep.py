from typing import Annotated

from fastapi import HTTPException, Path, status

from src.utils.is_valid_uuid4 import is_valid_uuid4


def validate_uuid4_dep(
    id_str: Annotated[
        str,
        Path(
            regex=r"^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$",
            title="uuid4",
            description="id must be valid",
        ),
    ],
) ->  str:
    """Valida e converte uma string em UUID4

    Args:
        id_str: String a ser validada como UUID4

    Returns:
        uuid.UUID: UUID4 validado

    Raises:
        HTTPException: Se o UUID for inválido
    """
    try:
        return is_valid_uuid4(id_str)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid UUID4 format",
        ) from exc
