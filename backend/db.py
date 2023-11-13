import sqlite3
from contextlib import closing
from datetime import datetime, timedelta, timezone
from uuid import UUID, uuid4

from exceptions import ResourceNotFoundException
from interfaces import DBInterface
from models import GoalsModel


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

    def read_goals(
        self,
    ) -> list[GoalsModel]:
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    SELECT
                        id,
                        name,
                        datetime(interval_start_date,'localtime') as interval_start_date,
                        interval_start_amount,
                        interval_target_amount,
                        interval_length_seconds,
                        bucket_size_seconds,
                        unit,
                        reset,
                        datetime(created_date,'localtime') as created_date
                    FROM goals
                    ORDER BY created_date;
                    """,
                )
                return [
                    GoalsModel(
                        id=row[0],
                        name=row[1],
                        interval_start_date=row[2],
                        interval_start_amount=row[3],
                        interval_target_amount=row[4],
                        interval_length=timedelta(seconds=float(row[5])),
                        bucket_size=timedelta(seconds=float(row[6])),
                        unit=row[7],
                        reset=row[8],
                        created_date=row[9],
                    )
                    for row in cursor.fetchall()
                ]

    def read_goal(
        self,
        goal_id: UUID,
    ) -> GoalsModel:
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    SELECT
                        id,
                        name,
                        datetime(interval_start_date,'localtime') as interval_start_date,
                        interval_start_amount,
                        interval_target_amount,
                        interval_length_seconds,
                        bucket_size_seconds,
                        unit,
                        reset,
                        datetime(created_date,'localtime') as created_date
                    FROM goals
                    WHERE id=? 
                    """,
                    [
                        str(goal_id),
                    ],
                )

                row = cursor.fetchone()
                if row is None:
                    raise ResourceNotFoundException

                return GoalsModel(
                    id=row[0],
                    name=row[1],
                    interval_start_date=row[2],
                    interval_start_amount=row[3],
                    interval_target_amount=row[4],
                    interval_length=timedelta(seconds=float(row[5])),
                    bucket_size=timedelta(seconds=float(row[6])),
                    unit=row[7],
                    reset=row[8],
                    created_date=row[9],
                )


if __name__ == "__main__":
    db = GoalsDB()

    print("\n == Create Goals == ")
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

    example_goal = None
    print("\n == Read Goals == ")
    for goal in db.read_goals():
        print(goal)

        if example_goal is None:
            example_goal = goal

    print("\n == Read Goal == ")
    if example_goal is None:
        raise Exception
    read_goal = db.read_goal(example_goal.id)
    print(read_goal)
