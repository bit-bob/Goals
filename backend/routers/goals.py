import logging
from datetime import datetime, timedelta

from db import goals_db
from exceptions import handle_http_exceptions
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(
    prefix="/goals",
)


# Create
class CreateGoalRequest(BaseModel):
    name: str
    interval_start_date: datetime
    interval_start_amount: float
    interval_target_amount: float
    interval_length: timedelta
    bucket_size: timedelta
    unit: str
    reset: bool


@router.post("/create")
@handle_http_exceptions
async def create_goal(
    request: CreateGoalRequest,
) -> None:
    logging.warn(f"Creating '{request.name}'")
    goals_db.create_goal(
        name=request.name,
        interval_start_date=request.interval_start_date,
        interval_start_amount=request.interval_start_amount,
        interval_target_amount=request.interval_target_amount,
        interval_length=request.interval_length,
        bucket_size=request.bucket_size,
        unit=request.unit,
        reset=request.reset,
    )
