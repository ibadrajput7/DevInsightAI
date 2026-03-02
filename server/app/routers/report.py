from fastapi import APIRouter, Depends, HTTPException
from Services.reports import filtering_report_data, get_all_report
from Schemas.review_schema import ReportSchema
from core.auth import get_current_active_user
from database.db import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from database.models import User

router = APIRouter(prefix= '/v1', tags = ['Report'])

@router.get('/report/{report_id}')
async def report_by_id(report_id: int , db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_active_user)):
  report = await filtering_report_data(db, current_user.id, report_id)
  if not report:
    raise HTTPException(status_code = 404, detail = 'No Data Found!')
  return report

@router.get('/report', response_model = List[ReportSchema])
async def report_data(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_active_user)):
  report = await get_all_report(db, current_user.id)
  return report