from sqlalchemy import select, and_
from database.models import CodeReview
from sqlalchemy.ext.asyncio import AsyncSession
from Services.caching import generate_key, get_cache, set_cache, delete_cache
from core.redis_pool import redis_client

async def filtering_report_data(db: AsyncSession, user_id: int, report_id: int):
    cache_key = generate_key(user_id, report_id)

    cache_data = await get_cache(redis_client, cache_key)
    if cache_data:
        print('Cache Hit')
        return cache_data
        
    print('Cache miss')

    result = await db.execute(
        select(CodeReview).where(
            and_(
                CodeReview.id == report_id,
                CodeReview.user_id == user_id
            )
        )
    )

    report = result.scalar_one_or_none()
    if not report:
        return None
    
    report_data = {
        "id": report.id,
        "source": report.source,
        "project_title": report.project_title,
        "executive_summary": report.executive_summary,
        "technology_stack_understanding": report.technology_stack_understanding,
        "security_assessment": report.security_assessment,
        "authentication_quality": report.authentication_quality,
        "database_design_review": report.database_design_review,
        "async_concurrency_risks": report.async_concurrency_risks,
        "performance_risks": report.performance_risks,
        "production_readiness_score": report.production_readiness_score,
        "technical_debt_level": report.technical_debt_level,
        "risk_severity_distribution": report.risk_severity_distribution,
        "top_prioritized_improvements": report.top_prioritized_improvements,
        "created_at": str(report.created_at)
    }
        
    await set_cache(redis_client, cache_key, report_data)
    return report_data
