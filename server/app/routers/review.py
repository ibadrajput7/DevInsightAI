from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from Schemas.review_schema import ReviewSchema
from Services.file_processor import process_github_repo, process_uploaded_archive
from Services.report_generator import generate_repository_report
from Services.code_review import adding_report_database
from core.auth import get_current_active_user
from database.models import User
from database.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from Schemas.review_schema import ReportSchema

router = APIRouter(prefix = '/v1/review-code', tags = ['Code Review Routers'])

@router.post("/github")
async def review_github_repo(
    request: ReviewSchema,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):

    if not request.github_repo:
        raise HTTPException(
            status_code=400,
            detail="GitHub repository URL is required"
        )

    files = await process_github_repo(str(request.github_repo))
    report_dict = await generate_repository_report(
        files,
        request.description
    )

    report_schema = ReportSchema(**report_dict)
    saved_report = await adding_report_database(
        db=db,
        report=report_schema,
        user_id=current_user.id,
        source="Github-Repo"
    )
    return saved_report


@router.post("/archive")
async def review_archive_file(
    description : str,
    archive: UploadFile = File(...),
    current_user : User = Depends(get_current_active_user)
):

    if not archive:
        raise HTTPException(
            status_code=400,
            detail="Archive file is required"
        )

    files = await process_uploaded_archive(archive)
    report = await generate_repository_report(files, description)
    
    return report