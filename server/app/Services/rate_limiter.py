import time
from core.redis_pool import redis_client

RATE_LIMIT = 10
WINDOW_SIZE = 60


async def is_allowed(user_id: str):

    current_window = int(time.time() / WINDOW_SIZE)

    key = f"rate:{user_id}:{current_window}"

    count = await redis_client.incr(key)

    if count == 1:
        await redis_client.expire(key, WINDOW_SIZE)

    return count <= RATE_LIMIT