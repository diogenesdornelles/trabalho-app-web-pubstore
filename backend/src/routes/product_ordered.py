"""Rotas para produtos"""

from typing import Annotated

from fastapi import APIRouter, Body, Depends, status
from fastapi.responses import ORJSONResponse

from src.crud.product_ordered_repository import ProductOrderedRepository
from src.dependencies.customer_auth_dep import customer_auth_dep
from src.dependencies.db_session_dep import DBSessionDep
from src.models.product_ordered import ProductOrderedIn, ProductOrderedOut

product_ordered_router: APIRouter = APIRouter(
    prefix="/products_ordered",
    tags=["products_ordered"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(customer_auth_dep)],
    default_response_class=ORJSONResponse,
)


@product_ordered_router.post("/", response_model=ProductOrderedOut)
async def create_one(
    db_session: DBSessionDep,
    order: Annotated[ProductOrderedIn, Body()],
) -> ORJSONResponse:
    """Busca produto por ID"""
    repo = ProductOrderedRepository(db_session)
    result = await repo.create_one(order)
    if result:
        return ORJSONResponse(
            content=result.model_dump(mode="json"),
            media_type="application/json; charset=UTF-8",
        )
    return ORJSONResponse(
        content={"Error": "order id not found"},
        status_code=status.HTTP_400_BAD_REQUEST,
        media_type="application/json; charset=UTF-8",
    )
