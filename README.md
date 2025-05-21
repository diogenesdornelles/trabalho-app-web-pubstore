# App Pub Store backend API

## Run

- `pip install uv`
- `uv venv`;
- `source .venv/bin/activate`;
- install deps with uv `uv pip install -r pyproject.toml`;
- set .env, according to ./settings.py
- Run on localhost machine to web dev:

  - `uvicorn main:app --host 127.0.0.1 --port 8080 --reload --env-file .env`

- Run on machine and expose public IP for mobile dev:

  - `uvicorn main:app --host 0.0.0.0 --port 8080 --reload --env-file .env`

- or, yet, with uv/task:

  - `uv run task dev`

- To generate seed: .env `GENERATE_SEED=True`
- Listen on <http://127.0.0.1:8080> ou <http://0.0.0.0:8080> (ver em .env qual ip e porta estão configurados)
- Não esquecer de atualizar URI das imagens em src/static. Devemos usar o endereço wifi da máquina server;
- Para obter endereço, ifconfig -> wlp0s20f3 -> IP privado n. 192.168.xx.xx;
- Não esquecer de atualizar o arquivo .env no frontend.
