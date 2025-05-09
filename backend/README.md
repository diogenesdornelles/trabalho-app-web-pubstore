# App Pub Store backend API

## Run

- `pip install uv`
- `uv venv`;
- `source .venv/bin/activate`;
- install deps with uv `uv pip install -r pyproject.toml`;
- Configurar o .env, conforme ./settings.py
- Rodar na própria máquina em localhost para web:

  - `uvicorn main:app --host 127.0.0.1 --port 8080 --reload --env-file .env`

- Rodar na máquina e expor na rede para uso em mobile:

  - `uvicorn main:app --host 0.0.0.0 --port 8080 --reload --env-file .env`

- ou, ianda com uv:

  - `uv run task dev`

- Para gerar seeds, habilite em .env `GENERATE_SEED=True`
- Listen on <http://127.0.0.1:8080> ou <http://0.0.0.0:8080>
- Não esquecer de atualizar URI das imagens em src/static. Devemos usar o endereço wifi da máquina server;
- Para obter endereço, ifconfig -> wlp0s20f3 -> IP privado n. 192.168.xx.xx;
