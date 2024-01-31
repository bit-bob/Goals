import logging
from uuid import UUID

from db import goals_db
from exceptions import handle_http_exceptions
from fastapi import APIRouter
from models import Record

router = APIRouter(
    prefix="/records",
)


# Create
@router.post("")
@handle_http_exceptions
async def create_record(
    record: Record,
) -> None:
    goal = goals_db.get_goal(record.goal_id)
    logging.warn(f"Creating Record for Goal '{goal.name}'")
    goals_db.create_record(
        record=record,
    )


# Read
@router.get("")
@handle_http_exceptions
async def get_records() -> list[Record]:
    logging.debug(f"Getting Records")
    return goals_db.get_records()


# Delete
@router.delete("/{record_id}")
@handle_http_exceptions
async def delete_record(
    record_id: UUID,
) -> None:
    record = goals_db.get_record(record_id)
    goal = goals_db.get_goal(record.goal_id)
    logging.warn(f"Deleting Record for Goal '{goal.name}'")
    goals_db.delete_record(record_id)
