"""Módulo customer_auth deps"""

from typing import Annotated, Dict, Literal, Optional, TypedDict

import jwt
from fastapi import Depends, Request, status
from settings import Settings
from src.crud.customer import get_one
from src.dependencies.db_session_dep import DBSessionDep
from src.dependencies.get_settings import get_settings


class AuthResult(TypedDict):
    """Modelo de resposta para autenticação

    Args:
        TypedDict (_type_):
    """

    status: Literal["success", "failed"]
    status_code: int
    message: Optional[str]  # Adicionado para mensagens adicionais
    customer_id: Optional[
        int
    ]  # Adicionado para retornar o ID do cliente em caso de sucesso


async def customer_auth(
    request: Request,
    settings: Annotated[Settings, Depends(get_settings)],
    db_session: DBSessionDep,
) -> AuthResult:
    """função de dependência que realiza a autenticação de cust

    Args:
        request (Request): a request

    Returns:
        AuthResult: Resultado do processo
    """
    bearer_token: str | None = request.headers.get("authorization")
    if bearer_token:
        try:
            data: str = bearer_token.split(" ")[-1]
            jwt_payload: Dict = jwt.decode(
                data, key=settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
            )
            token: Dict = jwt_payload["token"]
            customer_saved = await get_one(db_session, token["cpf"])
            if not customer_saved:
                return {
                    "status": "failed",
                    "status_code": status.HTTP_401_UNAUTHORIZED,
                    "message": "User not found",
                    "customer_id": None,
                }
            if token["password"] == customer_saved.password:
                return {
                    "status": "success",
                    "status_code": status.HTTP_200_OK,
                    "message": "Authentication successful",
                    "customer_id": customer_saved.id,
                }
            return {
                "status": "failed",
                "status_code": status.HTTP_401_UNAUTHORIZED,
                "message": "Invalid password",
                "customer_id": None,
            }
        except jwt.ExpiredSignatureError:
            return {
                "status": "failed",
                "status_code": status.HTTP_401_UNAUTHORIZED,
                "message": "Token has expired",
                "customer_id": None,
            }
        except jwt.DecodeError:
            return {
                "status": "failed",
                "status_code": status.HTTP_401_UNAUTHORIZED,
                "message": "Invalid token",
                "customer_id": None,
            }
    return {
        "status": "failed",
        "status_code": status.HTTP_401_UNAUTHORIZED,
        "message": "Authentication token not provided",
        "customer_id": None,
    }
