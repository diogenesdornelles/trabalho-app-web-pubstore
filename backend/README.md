# Instructions

## Run Backend

- Configurar o .env, conforme settings.py

`uvicorn main:app --host 127.0.0.1 --port 8080 --reload --env-file .env`

or

`uv run main.py`

- Listen on http://127.0.0.1:8080
