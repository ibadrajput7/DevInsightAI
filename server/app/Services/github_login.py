from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from database.models import User
from core.google_oauth import oauth
from fastapi import HTTPException


async def github_user_login(token: dict, db: AsyncSession):

    # Get GitHub user info
    resp = await oauth.github.get("user", token=token)
    github_user = resp.json()

    provider_id = str(github_user["id"])
    name = github_user.get("name") or github_user.get("login")
    avatar = github_user.get("avatar_url")

    # Fetch email separately
    email_resp = await oauth.github.get("user/emails", token=token)
    emails = email_resp.json()

    email = None
    for e in emails:
        if e.get("primary") and e.get("verified"):
            email = e["email"]
            break

    if not email:
        raise HTTPException(
            status_code=400,
            detail="GitHub email not available"
        )

    # Check if GitHub account already exists
    result = await db.execute(select(User).where(User.provider_id == provider_id))
    user = result.scalar_one_or_none()

    if user:
        return user

    # Check if email already exists
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()

    if user:
        user.provider_id = provider_id
        user.avatar_url = avatar
        user.auth_provider = "github"

        await db.commit()
        await db.refresh(user)
        return user

    # Create new user
    new_user = User(
        name=name,
        email=email,
        provider_id=provider_id,
        avatar_url=avatar,
        auth_provider="github",
        password=None
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user