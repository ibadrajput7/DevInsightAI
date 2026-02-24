from fastapi import Request
import time

async def performance_checker(request : Request , call_next):
  start_time = time.time()
  response = await call_next(request)
  total_time = time.time() - start_time
  print(f'API TOOK {total_time} TO PROCESS')
  response.headers['X-Performance'] = f'{str(total_time)} ms'
  return response
