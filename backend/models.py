from datetime import datetime, timedelta
from typing import Optional
from uuid import UUID, uuid4

from dates import datetime_now, get_timezone_aware_date
from pydantic import BaseModel, Field, model_validator


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
    progress: Optional[float] = None

    @model_validator(mode="after")
    def make_dates_timezone_aware(
        self,
    ) -> "Goal":
        self.interval_start_date = get_timezone_aware_date(self.interval_start_date)
        return self


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
    progress: Optional[float] = None

    @model_validator(mode="after")
    def make_dates_timezone_aware(
        self,
    ) -> "Record":
        self.date = get_timezone_aware_date(self.date)
        return self
