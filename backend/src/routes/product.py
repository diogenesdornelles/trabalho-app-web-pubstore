"""Rotas para produtos"""

from typing import Annotated, Literal, Optional

from fastapi import APIRouter, Depends, Path, status
from fastapi.responses import ORJSONResponse
from src.crud.product import get_all as all_prods
from src.crud.product import get_many as many_prods
from src.crud.product import get_one as one_prod
from src.dependencies.customer_auth import customer_auth
from src.dependencies.db_session_dep import DBSessionDep
from src.dependencies.validate_price_range import validate_price_range
from src.models.product import ProductOut

product_router: APIRouter = APIRouter(
    prefix="/products",
    tags=["products"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(customer_auth)],
    default_response_class=ORJSONResponse,
)


@product_router.get("/all", response_model=list[ProductOut])
async def get_all(db_session: DBSessionDep) -> ORJSONResponse:
    # Busca todos os registros da tabela Product
    result = await all_prods(db_session)
    return ORJSONResponse(
        content=[prod.model_dump() for prod in result],
        media_type="application/json; charset=UTF-8",
    )


@product_router.get("/many", response_model=list[ProductOut])
async def get_many(
    db_session: DBSessionDep,
    name: Optional[str] = None,
    description: Optional[str] = None,
    brand: Optional[str] = None,
    product_type: Optional[Literal["chopp", "wine", "drink", "sparkling"]] = None,
    price_range: tuple[Optional[float], Optional[float]] = Depends(
        validate_price_range
    ),
) -> ORJSONResponse:
    min_price, max_price = price_range

    result = await many_prods(
        db_session=db_session,
        name=name,
        description=description,
        brand=brand,
        product_type=product_type,
        min_price=min_price,
        max_price=max_price,
    )
    return ORJSONResponse(
        content=[prod.model_dump() for prod in result],
        media_type="application/json; charset=UTF-8",
    )


@product_router.get("/{product_id}", response_model=ProductOut)
async def get_one(
    product_id: Annotated[
        str | None,
        Path(
            regex=r"^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$",
            title="uuid4",
            description="id must be valid",
        ),
    ],
    db_session: DBSessionDep,
) -> ORJSONResponse:
    if product_id:
        result = await one_prod(db_session, product_id)
        return ORJSONResponse(
            content=result.model_dump(),
            media_type="application/json; charset=UTF-8",
        )
    return ORJSONResponse(
        content={"Error": "product id not found"},
        status_code=status.HTTP_400_BAD_REQUEST,
        media_type="application/json; charset=UTF-8",
    )
