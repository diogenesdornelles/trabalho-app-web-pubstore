from src.utils.get_settings import get_settings

settings = get_settings()

static_files_source = f"{settings.HTTP_URL}{settings.ADDRESS_STATIC_FILES}:{settings.PORT}/{settings.STATIC_FILES_DIR}"
