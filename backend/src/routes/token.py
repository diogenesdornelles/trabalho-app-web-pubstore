"""Rota para o fornecimento de token para login"""

from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import APIRouter, Depends
from fastapi.responses import ORJSONResponse
from fastapi import Body
from settings import Settings
from src.crud.customer import get_one as one_cust
from src.dependencies.db_session_dep import DBSessionDep
from src.dependencies.get_settings import get_settings

from src.models.customer import CustomerAuth
from src.dependencies.verify_pwd import verify_pwd

token_router: APIRouter = APIRouter(
    prefix="/login",
    tags=["login"],
    responses={404: {"description": "Not found"}},
    default_response_class=ORJSONResponse,
)


@token_router.post("/", response_model=None)
async def create_token(
    customer: Annotated[CustomerAuth, Body()],
    db_session: DBSessionDep,
    settings: Settings = Depends(get_settings),
) -> ORJSONResponse:
    customer_saved = await one_cust(db_session, customer.cpf)
    if not customer_saved:
        return ORJSONResponse(
            content={"failed": "Customert not found"},
            media_type="application/json; charset=UTF-8",
        )
    is_valid: bool = verify_pwd(customer.password, str(customer_saved.password))
    if is_valid:
        expiration = datetime.now(timezone.utc) + timedelta(
            minutes=float(settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        )
        data = {
            "token": customer_saved.model_dump(mode='json'),
            "exp": expiration,
        }
        token = jwt.encode(
            data,
            key=settings.SECRET_KEY,
            algorithm=settings.ALGORITHM,
            json_encoder=None,
        )
        return ORJSONResponse(
            content={
                "success": "created token",
                "access_token": token,
                "token_type": "bearer",
                "expiration": f"{expiration}",
            },
            media_type="application/json; charset=UTF-8",
        )
    return ORJSONResponse(
        content={"failed": "Passwords not match"},
        media_type="application/json; charset=UTF-8",
    )
