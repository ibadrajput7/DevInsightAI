from sqlalchemy.ext.asyncio import AsyncSession
from Schemas.users import UserCreate
from database.models.users import User
from sqlalchemy.future import select
from core.security import hash_password, verify_password


async def signup(db: AsyncSession, user_create: UserCreate):
    '''This function is a signup functionality for using
    consist of db handeling, input validation using pydantic and returning new created user'''
    result = await db.execute(
        select(User).where(User.email == user_create.email)
    )
    existing_user = result.scalar_one_or_none()

    if existing_user:
        return None

    hashed_password = hash_password(user_create.password)

    new_user = User(
        name=user_create.name,
        email=user_create.email,
        password=hashed_password,
        role=user_create.role,
        is_active=user_create.is_active
    )

    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return new_user


async def authenticate_user(db: AsyncSession, user_name : str, user_password : str):
  result = await db.execute(select(User).where(User.email == user_name))
  existing_result = result.scalar_one_or_none()
  if not existing_result or not verify_password(user_password, existing_result.password):
    return None
  return existing_result