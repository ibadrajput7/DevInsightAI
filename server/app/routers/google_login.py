from fastapi import APIRouter, Request, Depends, HTTPException, BackgroundTasks
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db
from core.google_oauth import oauth
from Services.google_login import user_login
from core.auth import create_access_token
from core.config import settings

FRONTEND_URL = "http://localhost:3000"


router = APIRouter(prefix="/v1/user", tags=["Google Login"])

@router.get("/auth/google/login")
async def login_google(request: Request):
    redirect_uri = request.url_for("google_callback")
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/auth/google/callback")
async def google_callback(request: Request, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    try:
        token = await oauth.google.authorize_access_token(request)
        user = await user_login(token, db, background_tasks)
        access_token = create_access_token({'sub' : user.email})
        return RedirectResponse(url=f"{FRONTEND_URL}/auth/callback?token={access_token}")

    except Exception as e:
        return RedirectResponse(url=f"{FRONTEND_URL}/auth?error=google_failed")