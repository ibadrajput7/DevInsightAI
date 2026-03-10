from fastapi import APIRouter, Request, Depends, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db
from core.google_oauth import oauth
from core.auth import create_access_token
from Services.github_login import github_user_login

router = APIRouter(prefix="/v1/user", tags=["GitHub Login"])


@router.get("/auth/github/login")
async def github_login(request: Request):
    redirect_uri = request.url_for("github_callback")
    return await oauth.github.authorize_redirect(request, redirect_uri)


@router.get("/auth/github/callback")
async def github_callback(request: Request, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    try:
        token = await oauth.github.authorize_access_token(request)

        user = await github_user_login(token, db)

        access_token = create_access_token({"sub": user.email})

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    except Exception:
        raise HTTPException(
            status_code=400,
            detail="GitHub authentication failed"
        )