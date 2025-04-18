from typing import Annotated, Dict, List, Literal, Optional, Union

from fastapi import APIRouter, Depends, Query, status
from fastapi.responses import JSONResponse

from controllers.product import ProductController
from dependencies.costumer import token_verify
from models.product import Product, ProductQuery


product_router: APIRouter = APIRouter(
    prefix="/products",
    tags=["products"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(token_verify)],
)

controller: ProductController = ProductController()


@product_router.get("/all", response_model=list[Product])
async def get_all() -> Union[JSONResponse, Dict]:
    result: List[Dict] | Dict = controller.get_all()
    return JSONResponse(content=result, media_type="application/json; charset=UTF-8")


@product_router.post("/many")
async def get_many(
    name: Optional[str] = None,
    description: Optional[str] = None,
    brand: Optional[str] = None,
    product_type: Optional[Literal["chopp", "wine", "drink", "sparkling"]] = None,
    min_price: Annotated[Optional[float], Query(gt=0)] = None,
    max_price: Annotated[Optional[float], Query(gt=0)] = None,
):
    query: ProductQuery = ProductQuery(
        name=name,
        brand=brand,
        min_price=min_price,
        max_price=max_price,
        type=product_type,
        description=description,
    )
    result = controller.get_many(query)
    return JSONResponse(content=result, media_type="application/json; charset=UTF-8")


@product_router.get("/", response_model=Product)
async def get_one(
    product_id: Annotated[
        str | None,
        Query(
            regex=r"^[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}$",
            title="uuid4",
            description="id must be valid",
        ),
    ],
) -> Union[JSONResponse, Dict]:
    if product_id:
        result = controller.get_one(product_id)
        return JSONResponse(
            content=result, media_type="application/json; charset=UTF-8"
        )
    return JSONResponse(
        content=result,
        status_code=status.HTTP_400_BAD_REQUEST,
        media_type="application/json; charset=UTF-8",
    )
