from pydantic import BaseModel, HttpUrl
from typing import Optional
from enum import Enum
from typing import List

class ReviewSchema(BaseModel):
  github_repo : Optional[HttpUrl] = None
  description : str

class TechnicalDebtLevel(str, Enum):
    Low = "Low"
    Medium = "Medium"
    High = "High"
    Critical = "Critical"


class RiskSeverityDistribution(BaseModel):
    critical: int
    high: int
    medium: int
    low: int


class ReportSchema(BaseModel):
    project_title: str
    executive_summary: str
    technology_stack_understanding: str
    architecture_review: str
    security_assessment: str
    authentication_quality: str
    database_design_review: str
    async_concurrency_risks: str
    performance_risks: str
    production_readiness_score: int  
    technical_debt_level: TechnicalDebtLevel
    risk_severity_distribution: RiskSeverityDistribution
    top_prioritized_improvements: List[str]