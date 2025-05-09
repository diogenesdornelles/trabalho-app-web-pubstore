"""Rotas para produtos"""

from typing import Annotated, Literal, Optional
from uuid import UUID

from fastapi import APIRouter, Depends, Path, status
from fastapi.responses import ORJSONResponse

from src.crud.product_repository import ProductRepository
from src.dependencies.customer_auth_dep import customer_auth_dep
from src.dependencies.db_session_dep import DBSessionDep
from src.dependencies.validate_price_range_dep import validate_price_range_dep
from src.dependencies.validate_uuid4_dep import validate_uuid4_dep
from src.models.product import ProductOut

product_router: APIRouter = APIRouter(
    prefix="/products",
    tags=["products"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(customer_auth_dep)],
    default_response_class=ORJSONResponse,
)


@product_router.get("/all", response_model=list[ProductOut])
async def get_all(db_session: DBSessionDep) -> ORJSONResponse:
    """Busca todos os registros da tabela Product"""
    repo = ProductRepository(db_session)
    result = await repo.get_all()
    return ORJSONResponse(
        content=[prod.model_dump(mode="json") for prod in result],
        media_type="application/json; charset=UTF-8",
    )


@product_router.get("/many", response_model=list[ProductOut])
async def get_many(
    db_session: DBSessionDep,
    name: Optional[str] = None,
    description: Optional[str] = None,
    brand: Optional[str] = None,
    product_type: Optional[
        Literal["chopp", "wine", "beer", "sparkling", "whiskey"]
    ] = None,
    skip: Optional[int] = None,
    price_range: tuple[Optional[float], Optional[float]] = Depends(
        validate_price_range_dep
    ),
) -> ORJSONResponse:
    """Busca produtos de acordo com filtro e um skip.
    Retorna no máximo 10 produtos por vez.
    Basta passar um skip para paginação.
    """
    min_price, max_price = price_range
    repo = ProductRepository(db_session)
    result = await repo.get_many(
        name=name,
        description=description,
        brand=brand,
        product_type=product_type,
        min_price=min_price,
        max_price=max_price,
        skip=skip,
    )
    return ORJSONResponse(
        content=[prod.model_dump(mode="json") for prod in result],
        media_type="application/json; charset=UTF-8",
    )


@product_router.get("/one/{product_id}", response_model=ProductOut)
async def get_one(
    db_session: DBSessionDep,
    product_id: Annotated[UUID, Path(), Depends(validate_uuid4_dep)],
) -> ORJSONResponse:
    """Busca produto por ID"""
    if product_id:
        repo = ProductRepository(db_session)
        result = await repo.get_one(product_id)
        return ORJSONResponse(
            content=result.model_dump(mode="json"),
            media_type="application/json; charset=UTF-8",
        )
    return ORJSONResponse(
        content={"Error": "product id not found"},
        status_code=status.HTTP_400_BAD_REQUEST,
        media_type="application/json; charset=UTF-8",
    )
