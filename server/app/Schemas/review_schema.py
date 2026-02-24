from pydantic import BaseModel, HttpUrl
from typing import Optional

class ReviewSchema(BaseModel):
  github_repo : Optional[HttpUrl] = None
  description : str
