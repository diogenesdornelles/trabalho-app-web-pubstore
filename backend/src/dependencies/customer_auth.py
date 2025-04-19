"""Módulo customer_auth deps"""
import os
from typing import Dict, Literal, Optional, TypedDict

import jwt
from dotenv import find_dotenv, load_dotenv
from fastapi import Request, status

from src.config.get_db import get_db
from src.schemas.customer import Customer

load_dotenv(find_dotenv())

SECRET_KEY = os.environ.get("SECRET_KEY") or '391842hjn2034cb2c280b423n2nx348c2cb3223'
ALGORITHM = os.environ.get("ALGORITHM") or 'SHA-256'


class AuthResult(TypedDict):
    """Modelo de resposta para autenticação

    Args:
        TypedDict (_type_):
    """
    status: Literal['success', 'failed']
    status_code: int
    message: Optional[str]  # Adicionado para mensagens adicionais
    customer_id: Optional[int]  # Adicionado para retornar o ID do cliente em caso de sucesso


async def customer_auth(request: Request) -> AuthResult:
    """função de dependência que realiza a autenticação de cust

    Args:
        request (Request): a request

    Returns:
        AuthResult: Resultado do processo
    """
    db = next(get_db())
    bearer_token: str | None = request.headers.get("authorization")
    if bearer_token:
        try:
            data: str = bearer_token.split(" ")[-1]
            jwt_payload: Dict = jwt.decode(data, key=SECRET_KEY, algorithms=[ALGORITHM])
            token: Dict = jwt_payload["token"]
            customer_saved = db.get(Customer, {"cpf": token["cpf"]})
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
            else:
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