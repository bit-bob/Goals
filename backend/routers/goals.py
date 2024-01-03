import logging
from uuid import UUID

from db import goals_db
from exceptions import ResourceNotFoundException, handle_http_exceptions
from fastapi import APIRouter
from models import Goal, Record

router = APIRouter(
    prefix="/goals",
)


# Create
@router.post("")
@handle_http_exceptions
async def create_goal(
    goal: Goal,
) -> None:
    logging.warn(f"Creating '{goal.name}'")
    goals_db.create_goal(
        goal=goal,
    )


# Read all
@router.get("")
@handle_http_exceptions
async def get_goals() -> list[Goal]:
    logging.debug(f"Getting Goals")
    return goals_db.get_goals()


# Read one
@router.get("/{goal_id}")
@handle_http_exceptions
async def get_goal(
    goal_id: UUID,
) -> Goal:
    goal = goals_db.get_goal(goal_id)
    logging.debug(f"Getting Goal '{goal.name}'")
    return goal


# Read all records for a goal
@router.get("/{goal_id}/records")
@handle_http_exceptions
async def get_goal_records(
    goal_id: UUID,
) -> list[Record]:
    goal = goals_db.get_goal(goal_id)
    logging.debug(f"Getting Records for Goal '{goal.name}'")
    return goals_db.get_records_for_goal(goal_id=goal_id)


# Delete
@router.delete("/{goal_id}")
@handle_http_exceptions
async def delete_goal(
    goal_id: UUID,
) -> None:
    try:
        goal = goals_db.get_goal(goal_id)
        logging.warn(f"Deleting '{goal.name}'")
        goals_db.delete_goal(goal_id)
    except ResourceNotFoundException:
        pass
