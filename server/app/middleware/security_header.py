from fastapi import Request
from fastapi.responses import Response

async def security_headers_middleware(request: Request, call_next):
    response: Response = await call_next(request)
    #adding this security headers for development, later in deployment phase i will setup all of it in nginx or cloudflare
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "SAMEORIGIN"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    # response.headers["Content-Security-Policy"] = "default-src 'self';"

    return response