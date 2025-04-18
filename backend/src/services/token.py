import os
from datetime import datetime, timedelta, timezone
from typing import Dict
import jwt
from database import DB
from dotenv import find_dotenv, load_dotenv
from models.costumer import CostumerAuth
from utils.verify_hashed_value import verify_hashed_value


load_dotenv(find_dotenv())

SECRET_KEY = os.environ.get("SECRET_KEY")

ALGORITHM = os.environ.get("ALGORITHM")

ACCESS_TOKEN_EXPIRE_MINUTES = float(
    os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES") or 86400
)


class TokenService:
    def __init__(self):
        self.database = DB.clients

    def create_token(self, costumer: CostumerAuth) -> Dict[str, str]:
        costumer_saved: Dict | None = self.database.find_one({"cpf": costumer.cpf})
        if not costumer_saved:
            raise ValueError("Costumer not found")
        is_valid: bool = verify_hashed_value(
            costumer.password, costumer_saved["password"]
        )
        if is_valid:
            expiration = datetime.now(timezone.utc) + timedelta(
                minutes=ACCESS_TOKEN_EXPIRE_MINUTES
            )
            data = {"token": costumer_saved, "exp": expiration}
            token = jwt.encode(
                data,
                key=SECRET_KEY,
                algorithm=ALGORITHM,
                json_encoder=None,
            )
            return {
                "success": "created token",
                "access_token": token,
                "token_type": "bearer",
                "expiration": f"{expiration}",
            }
        return {"failed": "Passwords not match"}

    def verify_token(self, cpf: str, password: str) -> bool:
        costumer_saved = self.database.find_one({"cpf": cpf})
        if not costumer_saved:
            return False
        return password == costumer_saved["password"]
