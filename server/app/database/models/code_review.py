from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    ForeignKey,
    DateTime,
    Enum,
    JSON
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum

from database.base import Base


class TechnicalDebtLevel(str, enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"


class CodeReview(Base):
    __tablename__ = "code_reviews"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    user = relationship(
        "User",
        back_populates="code_reviews"
    )
    source = Column(String(255), nullable = False)
    project_title = Column(String(255), nullable=False)
    executive_summary = Column(Text, nullable=False)
    technology_stack_understanding = Column(Text, nullable=False)
    architecture_review = Column(Text, nullable=False)
    security_assessment = Column(Text, nullable=False)
    authentication_quality = Column(Text, nullable=False)
    database_design_review = Column(Text, nullable=False)
    async_concurrency_risks = Column(Text, nullable=False)
    performance_risks = Column(Text, nullable=False)

    production_readiness_score = Column(Integer, nullable=False)

    technical_debt_level = Column(
        Enum(TechnicalDebtLevel, name="technical_debt_enum"),
        nullable=False
    )

    risk_severity_distribution = Column(JSON, nullable=False)

    top_prioritized_improvements = Column(JSON, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False
    )