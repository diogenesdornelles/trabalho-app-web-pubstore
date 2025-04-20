# app/models/__init__.py

from sqlalchemy.orm import declarative_base

Base = declarative_base() # model base class

from .customer import Customer
from .product import Product

