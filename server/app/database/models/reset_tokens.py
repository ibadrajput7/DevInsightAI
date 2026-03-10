from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime
from database.base import Base


class PasswordReset(Base):
    __tablename__ = "password_resets"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    code_hash = Column(String, nullable=False)

    expires_at = Column(DateTime, nullable=False)
    used = Column(Boolean, default=False)

    attempts = Column(Integer, default=0)

    created_at = Column(DateTime, default=datetime.utcnow)