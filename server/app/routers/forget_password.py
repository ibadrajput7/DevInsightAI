from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db
from Schemas.forget_password import *
from Services.forget_password import (
    forgot_password_service,
    verify_reset_code,
    reset_password_service
)

router = APIRouter(prefix="/v1/auth", tags=["auth"])


@router.post("/forgot-password")
async def forgot_password(data: ForgotPasswordRequest, db: AsyncSession = Depends(get_db)):

    await forgot_password_service(db, data.email)

    return {"message": "If the email exists, a reset code has been sent."}


@router.post("/verify-reset-code")
async def verify_code(data: VerifyCodeRequest, db: AsyncSession = Depends(get_db)):

    valid = await verify_reset_code(db, data.email, data.code)

    if not valid:
        return {"message": "Invalid or expired code"}

    return {"message": "Code verified"}


@router.post("/reset-password")
async def reset_password(data: ResetPasswordRequest, db: AsyncSession = Depends(get_db)):

    await reset_password_service(db, data.email, data.new_password)

    return {"message": "Password updated successfully"}