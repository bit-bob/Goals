import logging
from datetime import datetime, timedelta
from uuid import UUID

from db import goals_db
from exceptions import ResourceNotFoundException, handle_http_exceptions
from fastapi import APIRouter
from models import GoalsModel
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


@router.post("/")
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


# Read
class GetGoalsResponse(BaseModel):
    goals: list[GoalsModel]


@router.get("/")
async def get_goals() -> GetGoalsResponse:
    logging.debug(f"Getting Goals")
    return GetGoalsResponse(
        goals=goals_db.get_goals(),
    )


# Delete
@router.delete("/{item_id}")
async def delete_goal(
    goal_id: UUID,
) -> None:
    try:
        goal = goals_db.get_goal(goal_id)
        if goal is None:
            raise Exception

        logging.warn(f"Deleting '{goal.name}'")
        goals_db.delete_goal(goal_id)
    except ResourceNotFoundException:
        pass
