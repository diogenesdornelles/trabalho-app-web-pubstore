from database import DB

from models.product import ProductQuery


class ProductService:
    def __init__(self):
        self.database = DB.products

    def get_all(self) -> None:
        try:
            print('all')
        except errors.OperationFailure:
            print(errors)
        except Exception:
            print('falhou')

    def get_many(self, query: ProductQuery):
        try:
            print(query)
        except errors.OperationFailure:
            print(errors)
        except Exception:
            print('falhou')

    def get_one(self, product_id: str) -> None:
        try:
            print(product_id)
        except errors.OperationFailure:
            print(errors)
        except Exception:
            print('falhou')
