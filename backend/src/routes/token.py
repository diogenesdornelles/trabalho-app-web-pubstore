import os
from typing import Dict

from dotenv import find_dotenv, load_dotenv
from fastapi import APIRouter, status
from starlette.responses import JSONResponse
from controllers.tokens import TokenController
from models.costumer import CostumerAuth

load_dotenv(find_dotenv())

SECRET_KEY = os.environ.get("SECRET_KEY")

ALGORITHM = os.environ.get("ALGORITHM")

token_router: APIRouter = APIRouter(
    prefix="/login",
    tags=["login"],
    responses={404: {"description": "Not found"}},
)

controller = TokenController()


@token_router.post("/", response_model=None)
async def create_token(costumer: CostumerAuth) -> JSONResponse:
    result: Dict = controller.create_token(costumer)
    return JSONResponse(
        content=result,
        status_code=status.HTTP_201_CREATED,
        media_type="application/json; charset=UTF-8",
    )
