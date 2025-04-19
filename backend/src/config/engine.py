"""Módulo para criação de engine"""
import os

from dotenv import find_dotenv, load_dotenv
from sqlalchemy import create_engine

load_dotenv(find_dotenv())

DATABASE_URL = os.environ.get("DATABASE_URL")
db = "postgresql+psycopg2://postgres:231600@localhost:5432/pub_store"
try:
    if DATABASE_URL:
        engine = create_engine(db, echo=True)
        with engine.connect() as connection:
            print("Conexão com o PostgreSQL bem-sucedida!")
    else:
        raise ConnectionError("Cannot load database")
except Exception as e:
    print(f"Erro ao conectar ao PostgreSQL: {e}")
