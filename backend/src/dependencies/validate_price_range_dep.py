"""Módulo validate_price_range"""

from typing import Optional

from fastapi import HTTPException, Query, status


def validate_price_range_dep(
    min_price: Optional[float] = Query(None, gt=0),
    max_price: Optional[float] = Query(None, gt=0),
) -> tuple[Optional[float], Optional[float]]:
    """Validar busca por faixa de preço

    Args:
        min_price (Optional[float], optional): preço minimo. Defaults to Query(None, gt=0).
        max_price (Optional[float], optional): preço máximo. Defaults to Query(None, gt=0).

    Raises:
        HTTPException: Erro de bad request

    Returns:
        tuple[Optional[float], Optional[float]]: _description_
    """

    if min_price is not None and max_price is not None and min_price > max_price:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="min_price cannot be greater than max_price",
        )
    return min_price, max_price
