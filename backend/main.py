"""
Main module
"""

import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import ORJSONResponse
from fastapi.staticfiles import StaticFiles

from src.config.get_db_session import sessionmanager
from src.config.init_db import init_db
from src.routes.order import order_router
from src.routes.product import product_router
from src.routes.product_ordered import product_ordered_router
from src.routes.token import token_router
from src.utils.get_settings import get_settings


load_dotenv(".env", override=True)

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan app. Inicializa o banco de dados e fecha conn

    Args:
        app (FastAPI): _description_
    """
    if sessionmanager.engine is not None:
        await init_db(sessionmanager.engine, settings)
        yield
        await sessionmanager.close()


app = FastAPI(
    lifespan=lifespan,
    title="FastAPI PubStore APP",
    default_response_class=ORJSONResponse,
)


# Include routes to app
app.include_router(token_router)
app.include_router(product_router)
app.include_router(order_router)
app.include_router(product_ordered_router)


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/src/static",
    StaticFiles(directory=os.path.join(os.path.dirname(__file__), "src/static")),
    name="static",
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """_summary_

    Args:
        request (_type_): _description_
        exc (_type_): _description_

    Returns:
        _type_: _description_
    """
    return {"error": str(exc.detail)}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=int(settings.PORT),
        reload=True,
        env_file=".env",
    )
