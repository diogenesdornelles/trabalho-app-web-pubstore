import os
from typing import Dict

import jwt
from dotenv import find_dotenv, load_dotenv
from fastapi import Request, status

from src.config.get_db import get_db
from src.schemas.customer import Customer

load_dotenv(find_dotenv())

SECRET_KEY = os.environ.get("SECRET_KEY") or '391842hjn2034cb2c280b423n2nx348c2cb3223'

ALGORITHM = os.environ.get("ALGORITHM") or 'SHA-256'


async def customer_auth(request: Request) -> Dict:
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
                    "failed": "User email not founded or password is wrong",
                    "status_code": status.HTTP_401_UNAUTHORIZED,
                }
            if token["password"] == customer_saved["password"]:
                return {"success": "authentication is ok", "costumer": token["id"]}
        except jwt.ExpiredSignatureError:
            return {
                "failed": "signature has expired",
                "status_code": status.HTTP_401_UNAUTHORIZED,
            }
        except jwt.DecodeError:
            return {
                "failed": "invalid token",
                "status_code": status.HTTP_401_UNAUTHORIZED,
            }
    return {
        "failed": "give an authentication token",
        "status_code": status.HTTP_401_UNAUTHORIZED,
    }
