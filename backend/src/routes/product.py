from typing import Annotated, Literal, Optional

from fastapi import APIRouter, Depends, Query, status
from fastapi.responses import ORJSONResponse
from sqlalchemy.orm import Session

from dependencies.customer_auth import customer_auth
from src.config.get_db import get_db
from src.dependencies.validate_price_range import validate_price_range
from src.models.product import ProductRead
from src.schemas.product import Product

product_router: APIRouter = APIRouter(
    prefix="/products",
    tags=["products"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(customer_auth)],
    default_response_class=ORJSONResponse,
)


@product_router.get("/all", response_model=list[ProductRead])
async def get_all(db: Session = Depends(get_db)) -> ORJSONResponse:
    # Busca todos os registros da tabela Product
    result = db.query(Product).all()
    return ORJSONResponse(
        content=[ProductRead.model_validate(prod).model_dump() for prod in result],
        media_type="application/json; charset=UTF-8",
    )


@product_router.get("/many")
async def get_many(
    name: Optional[str] = None,
    description: Optional[str] = None,
    brand: Optional[str] = None,
    product_type: Optional[Literal["chopp", "wine", "drink", "sparkling"]] = None,
    price_range: tuple[Optional[float], Optional[float]] = Depends(
        validate_price_range
    ),
    db: Session = Depends(get_db),
) -> ORJSONResponse:

    min_price, max_price = price_range

    query = db.query(Product)

    if name:
        query = query.filter(Product.name.ilike(f"%{name}%"))
    if description:
        query = query.filter(Product.description.ilike(f"%{description}%"))
    if brand:
        query = query.filter(Product.brand.ilike(f"%{brand}%"))
    if product_type:
        query = query.filter(Product.type == product_type)
    if min_price:
        query = query.filter(Product.price >= min_price)
    if max_price:
        query = query.filter(Product.price <= max_price)

    # Executa a consulta e retorna os resultados
    result = query.all()
    return ORJSONResponse(
        content=[ProductRead.model_validate(prod).model_dump() for prod in result],
        media_type="application/json; charset=UTF-8",
    )


@product_router.get("/{product_id}", response_model=ProductRead)
async def get_one(
    product_id: Annotated[
        str | None,
        Query(
            regex=r"^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$",
            title="uuid4",
            description="id must be valid",
        ),
    ],
    db: Session = Depends(get_db),
) -> ORJSONResponse:
    if product_id:
        result = db.get(Product, {"id": product_id})
        return ORJSONResponse(
            content=ProductRead.model_validate(result).model_dump(), media_type="application/json; charset=UTF-8"
        )
    return ORJSONResponse(
        content={'Error': 'product id not found'},
        status_code=status.HTTP_400_BAD_REQUEST,
        media_type="application/json; charset=UTF-8",
    )
