from fastapi import APIRouter, HTTPException, UploadFile, File, Depends
from Schemas.review_schema import ReviewSchema
from Services.file_processor import process_github_repo, process_uploaded_archive
from Services.report_generator import generate_repository_report
from core.auth import get_current_active_user
from database.models import User

router = APIRouter(prefix = '/v1/review-code', tags = ['Code Review Routers'])

@router.post("/github")
async def review_github_repo(request: ReviewSchema, current_user : User = Depends(get_current_active_user)):    

    if not request.github_repo:
        raise HTTPException(
            status_code=400,
            detail="GitHub repository URL is required"
        )

    files = await process_github_repo(str(request.github_repo))
    report = await generate_repository_report(files , request.description)
    return report

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