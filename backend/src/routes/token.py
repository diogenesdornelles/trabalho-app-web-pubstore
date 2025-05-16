"""Rota para o fornecimento de token para login"""

from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import APIRouter, Body, Depends
from fastapi.responses import ORJSONResponse

from settings import Settings
from src.crud.customer_repository import CustomerRepository
from src.dependencies.db_session_dep import DBSessionDep
from src.models.customer import CustomerAuth
from src.utils.get_settings import get_settings
from src.utils.verify_pwd import verify_pwd

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
    """Route to create a token for login"""
    repo = CustomerRepository(db_session)
    customer_saved = await repo.get_one_for_auth(customer.cpf)
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
            "token": customer_saved.model_dump(
                mode="json", exclude={"password", "cpf", "created_at"}
            ),
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
                "expires_at": expiration.isoformat(),
                "customer": customer_saved.model_dump(
                    mode="json", exclude={"password"}
                ),
            },
            media_type="application/json; charset=UTF-8",
        )
    return ORJSONResponse(
        content={"failed": "Passwords not match"},
        media_type="application/json; charset=UTF-8",
    )
