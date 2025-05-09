"""Settings module"""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Retorna variáveis de ambiente

    Args:
        BaseSettings (_type_):
        case_sensitive (bool, optional):
    """

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: str
    DB_NAME: str
    DB_HOST: str
    DB_USER: str
    DB_PWD: str
    DB_PORT: str
    HOST: str
    PORT: str
    SUPER_USER_COD: str
    SUPER_USER_PWD: str
    STATIC_FILES_DIR: str
    HTTP_URL: str
    ADDRESS_STATIC_FILES: str
    GENERATE_SEED: bool
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )
