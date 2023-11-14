from datetime import datetime, timedelta, timezone
from uuid import UUID, uuid4

from pydantic import BaseModel


class GoalsModel(BaseModel):
    id: UUID = uuid4()
    name: str
    interval_start_date: datetime
    interval_start_amount: float
    interval_target_amount: float
    interval_length: timedelta
    bucket_size: timedelta
    unit: str
    reset: bool
    created_date: datetime = datetime.now().replace(tzinfo=timezone.utc)


class RecordsModel(BaseModel):
    id: UUID = uuid4()
    goal_id: UUID
    date: datetime
    amount: float
    created_date: datetime = datetime.now().replace(tzinfo=timezone.utc)
