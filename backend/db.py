import sqlite3
from contextlib import closing
from datetime import datetime, timedelta, timezone
from uuid import uuid4

from interfaces import DBInterface


class GoalsDB(DBInterface):
    path = "backend/goals.db"

    def __init__(self) -> None:
        super().__init__()
        self.create_goals_table()
        self.create_records_table()

    def create_goals_table(self):
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    CREATE TABLE IF NOT EXISTS goals (
                        id TEXT PRIMARY KEY,
                        name TEXT NOT NULL,
                        interval_start_date TEXT,
                        interval_start_amount REAL,
                        interval_target_amount REAL,
                        interval_length_seconds TEXT,
                        bucket_size_seconds TEXT,
                        unit str,
                        reset bool,
                        created_date TEXT DEFAULT CURRENT_TIMESTAMP
                    );
                    """
                )

    def create_records_table(self):
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    CREATE TABLE IF NOT EXISTS records (
                        id TEXT PRIMARY KEY,
                        goal_id TEXT,
                        date TEXT,
                        amount REAL,
                        created_date TEXT DEFAULT CURRENT_TIMESTAMP
                    );
                    """
                )

    def create_goal(
        self,
        name: str,
        interval_start_date: datetime,
        interval_start_amount: float,
        interval_target_amount: float,
        interval_length: timedelta,
        bucket_size: timedelta,
        unit: str,
        reset: bool,
    ):
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    INSERT INTO goals(
                        id,
                        name,
                        interval_start_date,
                        interval_start_amount,
                        interval_target_amount,
                        interval_length_seconds,
                        bucket_size_seconds,
                        unit,
                        reset,
                        created_date
                    ) VALUES(?,?,?,?,?,?,?,?,?,?);
                    """,
                    [
                        str(uuid4()),
                        name,
                        interval_start_date,
                        interval_start_amount,
                        interval_target_amount,
                        interval_length.total_seconds(),
                        bucket_size.total_seconds(),
                        unit,
                        reset,
                        datetime.now().replace(tzinfo=timezone.utc),
                    ],
                )
                connection.commit()

if __name__ == "__main__":
    db = GoalsDB()
    db.create_goal(
        name="beep",
        interval_start_date=datetime(2023, 11, 13),
        interval_start_amount=0,
        interval_target_amount=1200,
        interval_length=timedelta(days=1),
        bucket_size=timedelta(minutes=5),
        unit="calories",
        reset=False,
    )
