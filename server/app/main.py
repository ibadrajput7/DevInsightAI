from fastapi import FastAPI
from routers.users import router as user_router
from routers.review import router as review_router
from routers.report import router as report_router
from middleware.profiling import performance_checker
from middleware.rate_limit import rate_limiter
from middleware.security_header import security_headers_middleware
from middleware.cors_middleware import add_cors_middleware
from middleware.session_middleware import add_session_middleware
from routers.google_login import router as google_router
from routers.github_login import router as github_router
from routers.forget_password import router as forgetpassword_router

app = FastAPI(title= 'DevInsight AI - Personal AI Code Insight Reviewer')

add_session_middleware(app)
add_cors_middleware(app)
app.middleware('http')(security_headers_middleware)
app.middleware('http')(rate_limiter)
app.middleware('http')(performance_checker)

@app.get('/health')
def check_health():
  return {'message': 'Health Check Successful'}

app.include_router(user_router)
app.include_router(review_router)
app.include_router(report_router)
app.include_router(google_router)
app.include_router(github_router)
app.include_router(forgetpassword_router)