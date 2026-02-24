from fastapi import FastAPI
from routers.users import router as user_router
from routers.review import router as review_router
from middleware.profiling import performance_checker

app = FastAPI(title= 'DevInsight AI - Personal AI Code Insight Reviewer')

app.middleware('http')(performance_checker)

@app.get('/health')
def check_health():
  return {'message': 'Health Check Successful'}

app.include_router(user_router)
app.include_router(review_router)