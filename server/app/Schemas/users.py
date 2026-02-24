from pydantic import BaseModel, field_validator, EmailStr
from typing import Literal
import re

class UserCreate(BaseModel):
  name: str
  email : EmailStr
  password : str
  role : str = Literal['user', 'admin']
  is_active : bool = True

  @field_validator('password')
  @classmethod
  def validate_password(cls, value):
        """
        Validates password strength for production-level security.
        Rules:
        - Minimum 8 characters
        - At least 1 uppercase letter
        - At least 1 lowercase letter
        - At least 1 digit
        - At least 1 special character
        """
        if len(value) < 8:
            raise ValueError("Password must be at least 8 characters long.")
        if not re.search(r"[A-Z]", value):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"[a-z]", value):
            raise ValueError("Password must contain at least one lowercase letter.")
        if not re.search(r"\d", value):
            raise ValueError("Password must contain at least one digit.")
        if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", value):
            raise ValueError("Password must contain at least one special character.")
        if re.search(r"\s", value):
            raise ValueError("Password must not contain spaces.")
        return value
  

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role : str

class TokenResponse(BaseModel):
    access_token : str
    token_type : str = 'Bearer'

