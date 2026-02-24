from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from Services.users import signup, authenticate_user
from Schemas.users import UserCreate, UserResponse, TokenResponse
from sqlalchemy.ext.asyncio import AsyncSession
from database.db import get_db
from core.auth import create_access_token, get_current_user
from database.models import User
from Services.email_sending import send_welcome_email

router = APIRouter(prefix="/v1/users", tags=["Users"])

@router.post("/signup", response_model = UserResponse)
async def signup_router(user: UserCreate, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    result = await signup(db, user)
    if not result:
        raise HTTPException(status_code = 409, detail = 'User Already Exists')
    background_tasks.add_task(send_welcome_email, result.name, result.email)
    return result

@router.post('/token', response_model=TokenResponse)
async def login_router(user_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    user = await authenticate_user(db, user_name = user_data.username, user_password = user_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    access_token = create_access_token({"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.get('/me', response_model=UserResponse)
async def accessing_details(
    current_user: User = Depends(get_current_user)
):
    return current_user