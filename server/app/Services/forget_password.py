from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timedelta
from database.models import User
from database.models.reset_tokens import PasswordReset
from core.utils import generate_otp, hash_code
from core.security import hash_password
from Services.email_sending import send_reset_email


async def forgot_password_service(db: AsyncSession, email: str):
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    # prevent email enumeration
    if not user:
        return
    otp = generate_otp()
    code_hash = hash_code(otp)
    reset = PasswordReset(
        user_id=user.id,
        code_hash=code_hash,
        expires_at=datetime.utcnow() + timedelta(minutes=15)
    )
    db.add(reset)
    await db.commit()
    await send_reset_email(user.email, user.name, otp)

async def verify_reset_code(db: AsyncSession, email: str, code: str):

    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user:
        return False

    result = await db.execute(
        select(PasswordReset)
        .where(PasswordReset.user_id == user.id)
        .order_by(PasswordReset.created_at.desc())
    )
    reset = result.scalars().first()

    if not reset:
        return False

    if reset.used:
        return False

    if reset.expires_at < datetime.utcnow():
        return False

    if reset.attempts >= 5:
        return False

    if reset.code_hash != hash_code(code):
        reset.attempts += 1
        await db.commit()
        return False

    return True

async def reset_password_service(db: AsyncSession, email: str, new_password: str):
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user:
        return False

    user.password = hash_password(new_password)

    result = await db.execute(
        select(PasswordReset)
        .where(PasswordReset.user_id == user.id)
        .order_by(PasswordReset.created_at.desc())
    )

    reset = result.scalars().first()

    if reset:
        reset.used = True

    await db.commit()

    return True