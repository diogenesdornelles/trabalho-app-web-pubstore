"""Rotas para produtos"""

from typing import Annotated

from fastapi import APIRouter, Body, Depends, Path, status
from fastapi.responses import ORJSONResponse

from src.crud.order_repository import OrderRepository
from src.dependencies.customer_auth_dep import customer_auth_dep
from src.dependencies.db_session_dep import DBSessionDep
from src.models.order import OrderIn, OrderOut

order_router: APIRouter = APIRouter(
    prefix="/orders",
    tags=["orders"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(customer_auth_dep)],
    default_response_class=ORJSONResponse,
)


@order_router.get("/get_by_customer_id/{customer_id}", response_model=list[OrderOut])
async def get_by_customer_id(
    db_session: DBSessionDep,
    customer_id: Annotated[str, Path(regex="^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")],
) -> ORJSONResponse:
    """Busca todos os registros da tabela Order por cliente"""
    repo = OrderRepository(db_session)
    result = await repo.get_by_customer_id(customer_id)
    return ORJSONResponse(
        content=[ord.model_dump(mode="json") for ord in result],
        media_type="application/json; charset=UTF-8",
    )


@order_router.get("/get_one/{order_id}", response_model=list[OrderOut])
async def get_one(
    db_session: DBSessionDep,
    order_id: Annotated[str, Path(regex="^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$")],
) -> ORJSONResponse:
    """Busca todos os registros da tabela Order por cliente"""
    repo = OrderRepository(db_session)
    result = await repo.get_one(order_id)
    return ORJSONResponse(
        content=result.model_dump(mode="json"),
        media_type="application/json; charset=UTF-8",
    )


@order_router.post("/", response_model=OrderOut)
async def create_one(
    db_session: DBSessionDep,
    order: Annotated[OrderIn, Body()],
) -> ORJSONResponse:
    """Busca produto por ID"""
    repo = OrderRepository(db_session)
    result = await repo.create(order)
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
