from starlette.middleware.sessions import SessionMiddleware
from core.config import settings

def add_session_middleware(app):
        app.add_middleware(
        SessionMiddleware,
        secret_key= settings.SESSION_SECRET_KEY
)
