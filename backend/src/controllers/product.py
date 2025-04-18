from typing import Dict, List

from models.product import ProductQuery
from services.product import ProductService


class ProductController:
    def __init__(self):
        self.service: ProductService = ProductService()

    def get_all(self) -> List[Dict] | Dict:
        self.service.get_all()
        response = self.service.get_all()
        return response

    def get_one(self, product_id: str) -> Dict:
        self.service.get_one(product_id)
        response = self.service.get_one(product_id)
        return response

    def get_many(self, query: ProductQuery) -> List[Dict] | Dict:
        self.service.get_many(query)
        response: List[Dict] = self.service.get_many(query)
        return response
