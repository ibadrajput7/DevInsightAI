from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status
from database.models.users import User


async def user_login(token: dict, db: AsyncSession) -> User:
    try:
        user_info = token.get("userinfo")

        if not user_info:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Google token: user info missing"
            )

        provider_id = user_info.get("sub")
        email = user_info.get("email")
        name = user_info.get("name")
        picture = user_info.get("picture")
        email_verified = user_info.get("email_verified")

        if not email or not provider_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Google token payload"
            )

        if not email_verified:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Google email not verified"
            )

        # STEP 1: Check by google_id
        result = await db.execute(
            select(User).where(User.provider_id == provider_id)
        )
        user = result.scalar_one_or_none()

        if user:
            return user

        # STEP 2: Check by email (existing account)
        result = await db.execute(
            select(User).where(User.email == email)
        )
        user = result.scalar_one_or_none()

        if user:
            user.provider_id = provider_id
            user.avatar_url = picture
            user.auth_provider = "google"

            await db.commit()
            await db.refresh(user)

            return user

        # STEP 3: Create new user
        new_user = User(
            name=name,
            email=email,
            provider_id=provider_id,
            avatar_url=picture,
            auth_provider="google",
            password=None
        )

        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        return new_user

    except HTTPException:
        raise

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Google authentication failed"
        )