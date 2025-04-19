import os
from datetime import datetime, timedelta, timezone

import jwt
from dotenv import find_dotenv, load_dotenv
from fastapi import APIRouter, Depends
from fastapi.responses import ORJSONResponse
from sqlalchemy.orm import Session

from src.config.get_db import get_db
from src.models.customer import CustomerAuth
from src.schemas.customer import Customer
from utils.verify_hashed_value import verify_hashed_value

load_dotenv(find_dotenv())

SECRET_KEY = os.environ.get("SECRET_KEY")

ALGORITHM = os.environ.get("ALGORITHM")

ACCESS_TOKEN_EXPIRE_MINUTES = float(
    os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES") or 86400
)

token_router: APIRouter = APIRouter(
    prefix="/login",
    tags=["login"],
    responses={404: {"description": "Not found"}},
    default_response_class=ORJSONResponse,
)


@token_router.post("/", response_model=None)
async def create_token(
    customer: CustomerAuth, db: Session = Depends(get_db)
) -> ORJSONResponse:
    customer_saved = db.get(Customer, {"cpf": customer.cpf})
    if not customer_saved:
        return ORJSONResponse(
            content={"failed": "Customert not found"},
            media_type="application/json; charset=UTF-8",
        )
    is_valid: bool = verify_hashed_value(
        customer.password, str(customer_saved.password)
    )
    if is_valid:
        expiration = datetime.now(timezone.utc) + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
        data = {"token": customer_saved, "exp": expiration}
        token = jwt.encode(
            data,
            key=SECRET_KEY,
            algorithm=ALGORITHM,
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
