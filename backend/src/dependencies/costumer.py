import os
from typing import Dict

import jwt
from dotenv import find_dotenv, load_dotenv
from fastapi import Request, status

from controllers.tokens import TokenController

controller = TokenController()

load_dotenv(find_dotenv())

SECRET_KEY = os.environ.get("SECRET_KEY")

ALGORITHM = os.environ.get("ALGORITHM")


async def token_verify(request: Request) -> Dict:
    bearer_token: str | None = request.headers.get('authorization')
    if bearer_token:
        try:
            data: str = bearer_token.split(' ')[-1]
            jwt_payload: Dict = jwt.decode(data, key=SECRET_KEY, algorithms=[ALGORITHM])
            token: Dict = jwt_payload['token']
            if not controller.verify_token(token['cpf'], token['password']):
                return {'failed': 'User email not founded or password is wrong',
                        'status_code': status.HTTP_401_UNAUTHORIZED}
            return {'success': 'authentication is ok', 'client_id': token['_id']}
        except jwt.ExpiredSignatureError:
            return {'failed': 'signature has expired',
                    'status_code': status.HTTP_401_UNAUTHORIZED}
        except jwt.DecodeError:
            return {'failed': 'invalid token',
                    'status_code': status.HTTP_401_UNAUTHORIZED}
    return {'failed': 'give an authentication token',
            'status_code': status.HTTP_401_UNAUTHORIZED}

