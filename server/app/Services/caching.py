import json
import random

DEFAULT_TTL = 300

def generate_key(user_id: int, report_id: int) -> str:
  return f'report:user:{user_id}:id:{report_id}'

async def get_cache(redis_client, key: str):
    data = await redis_client.get(key)
    if data:
        return json.loads(data)
    return None

async def set_cache(redis_client, key: str, value: dict, ttl: int = DEFAULT_TTL):
    jitter = random.randint(0, 30)
    await redis_client.set(
        key,
        json.dumps(value),
        ex=ttl + jitter
    )

async def delete_cache(redis_client, key:str):
   await redis_client.delete(key)