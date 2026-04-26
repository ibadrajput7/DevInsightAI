import json
import random
import logging

logger = logging.getLogger(__name__)

DEFAULT_TTL = 300

def generate_key(user_id: int, report_id: int) -> str:
  return f'report:user:{user_id}:id:{report_id}'

async def get_cache(redis_client, key: str):
    try:
        data = await redis_client.get(key)
        if data:
            return json.loads(data)
    except Exception as e:
        logger.warning(f"Redis cache miss due to error: {e}")
    return None

async def set_cache(redis_client, key: str, value: dict, ttl: int = DEFAULT_TTL):
    jitter = random.randint(0, 30)
    try:
        await redis_client.set(
            key,
            json.dumps(value),
            ex=ttl + jitter
        )
    except Exception as e:
        logger.warning(f"Failed to set Redis cache: {e}")

async def delete_cache(redis_client, key:str):
    try:
        await redis_client.delete(key)
    except Exception as e:
        logger.warning(f"Failed to delete Redis cache: {e}")