from fastapi import Request
from Services.rate_limiter import is_allowed
from fastapi.responses import JSONResponse
from Services.rate_limiter import RATE_LIMIT


async def rate_limiter(request: Request, call_next):

    user_id = request.client.host

    allowed, count, remaining, window = await is_allowed(user_id)

    if not allowed:
        return JSONResponse(
            status_code=429,
            content={"message": "Rate limit exceeded"},
            headers={
                "X-RateLimit-Limit": str(RATE_LIMIT),
                "X-RateLimit-Remaining": "0",
                "Retry-After": str(window)
            }
        )

    response = await call_next(request)

    response.headers["X-RateLimit-Limit"] = str(RATE_LIMIT)
    response.headers["X-RateLimit-Remaining"] = str(remaining)

    return response