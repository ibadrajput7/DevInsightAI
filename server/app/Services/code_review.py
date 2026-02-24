from sqlalchemy.ext.asyncio import AsyncSession
from Schemas.review_schema import ReportSchema
from database.models.code_review import CodeReview

async def adding_report_database(db: AsyncSession, report: ReportSchema, user_id : int, source: str):
    new_report = CodeReview(user_id = user_id, 
                            source = source,
                            project_title = report.project_title,
                            executive_summary = report.executive_summary,
                            technology_stack_understanding = report.technology_stack_understanding,
                            architecture_review = report.architecture_review,
                            security_assessment = report.security_assessment,
                            authentication_quality = report.authentication_quality,
                            database_design_review = report.database_design_review,
                            async_concurrency_risks = report.async_concurrency_risks,
                            performance_risks = report.performance_risks,
                            production_readiness_score = report.production_readiness_score,
                            technical_debt_level = report.technical_debt_level,
                            risk_severity_distribution = report.risk_severity_distribution.model_dump(),
                            top_prioritized_improvements = report.top_prioritized_improvements)
    db.add(new_report)
    await db.commit()
    await db.refresh(new_report)
    return new_report