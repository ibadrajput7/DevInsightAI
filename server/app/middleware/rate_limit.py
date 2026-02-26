from fastapi import Request
from Services.rate_limiter import is_allowed
from fastapi.responses import JSONResponse

async def rate_limiter(request: Request, call_next):
  user_id = request.client.host
  if not await is_allowed(user_id):
      return JSONResponse(
          status_code=429,
          content={"message": "Rate limit exceeded"}
      )
  reponse = await call_next(request)
  return reponse
  