from jose import jwt, JWTError
from datetime import datetime, timezone, timedelta
from core.config import settings
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends, HTTPException, status
from database.db import get_db
from sqlalchemy.future import select
from database.models import User

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRY = settings.ACCESS_TOKEN_EXPIRY

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="v1/users/token")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expiry = datetime.now(timezone.utc) + expires_delta
    else:
        expiry = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRY)
    to_encode.update({"exp": expiry})
    access_token = jwt.encode(to_encode, SECRET_KEY, algorithm = ALGORITHM)
    return access_token

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token: str = Depends(oauth2_scheme),
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str | None = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if user is None:
        raise credentials_exception
    return user
    
async def get_current_active_user(current_user : User = Depends(get_current_user)):
    if not current_user.is_active:
        raise HTTPException(status_code = 403, detail = 'Your profile is not Active!')
    return current_user

async def get_admin_user(current_user : User = Depends(get_current_active_user)):
    if current_user.role != 'admin':
        raise HTTPException(status_code = 401, detail = 'Only admin have authority to access this api')
    return current_user