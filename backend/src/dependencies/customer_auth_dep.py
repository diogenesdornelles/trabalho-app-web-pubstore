"""Módulo customer_auth deps"""

from typing import Annotated, Dict, Literal, Optional, TypedDict

import jwt
from fastapi import Depends, Request, status

from settings import Settings
from src.crud.customer_repository import CustomerRepository
from src.dependencies.db_session_dep import DBSessionDep
from src.utils.get_settings import get_settings


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


async def customer_auth_dep(
    request: Request,
    settings: Annotated[Settings, Depends(get_settings)],
    db_session: DBSessionDep,
) -> AuthResult:
    """função de dependência que realiza a autenticação de customer"""
    repo = CustomerRepository(db_session)
    bearer_token: str | None = request.headers.get("authorization")
    if not bearer_token:
        return {
            "status": "failed",
            "status_code": status.HTTP_401_UNAUTHORIZED,
            "message": "Authentication token not provided",
            "customer_id": None,
        }

    try:
        data: str = bearer_token.split(" ")[-1]
        jwt_payload: Dict = jwt.decode(
            data, key=settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )

        # Validar se o token tem os campos necessários
        if "token" not in jwt_payload or "id" not in jwt_payload["token"]:
            return {
                "status": "failed",
                "status_code": status.HTTP_401_UNAUTHORIZED,
                "message": "Invalid token structure",
                "customer_id": None,
            }

        token: Dict = jwt_payload["token"]

        # Buscar o usuário pelo CPF
        customer_saved = await repo.get_one_for_auth(token["id"])
        if not customer_saved:
            return {
                "status": "failed",
                "status_code": status.HTTP_401_UNAUTHORIZED,
                "message": "User not found",
                "customer_id": None,
            }

        if token["cpf"] == customer_saved.cpf:
            return {
                "status": "success",
                "status_code": status.HTTP_200_OK,
                "message": "Authentication successful",
                "customer_id": str(customer_saved.id),
            }

        return {
            "status": "failed",
            "status_code": status.HTTP_401_UNAUTHORIZED,
            "message": "Invalid authentication data",
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
    except Exception as e:
        return {
            "status": "failed",
            "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": f"Authentication error: {str(e)}",
            "customer_id": None,
        }
