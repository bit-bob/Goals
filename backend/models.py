from datetime import datetime, timedelta, timezone
from uuid import UUID, uuid4

from pydantic import BaseModel, Field


def datetime_now() -> datetime:
    return datetime.now(timezone.utc)


class Goal(BaseModel):
    id: UUID = Field(
        default_factory=uuid4,
    )
    name: str
    interval_start_date: datetime
    interval_start_amount: float
    interval_target_amount: float
    interval_length: timedelta
    bucket_size: timedelta
    unit: str
    reset: bool
    created_date: datetime = Field(
        default_factory=datetime_now,
    )


class Record(BaseModel):
    id: UUID = Field(
        default_factory=uuid4,
    )
    goal_id: UUID
    date: datetime
    amount: float
    created_date: datetime = Field(
        default_factory=datetime_now,
    )


class Progress(BaseModel):
    goal_id: UUID
    records: list[Record]
    recorded_amount_at_start: float
