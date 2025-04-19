""" get_db module"""
from sqlalchemy.orm import sessionmaker

from src.config.engine import engine

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """Retorna um gerador que serve uma instância de conexão ao banco

    Yields:
        _type_: db Session
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
