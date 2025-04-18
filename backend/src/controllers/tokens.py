from typing import Dict

from models.costumer import CostumerAuth
from services.token import TokenService


class TokenController:
    def __init__(self):
        self.service: TokenService = TokenService()

    def create_token(self, costumer: CostumerAuth) -> Dict:
        response: Dict = self.service.create_token(costumer)
        return response

    def verify_token(self, cpf: str, password: str) -> bool:
        response: bool = self.service.verify_token(cpf, password)
        return response
