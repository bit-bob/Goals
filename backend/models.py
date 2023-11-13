from datetime import datetime, timedelta
from uuid import UUID

from pydantic import BaseModel


class GoalsModel(BaseModel):
    id: UUID
    name: str
    interval_start_date: datetime
    interval_start_amount: float
    interval_target_amount: float
    interval_length: timedelta
    bucket_size: timedelta
    unit: str
    reset: bool
    created_date: datetime
