import sqlite3
from contextlib import closing
from datetime import datetime, timedelta
from pprint import pprint
from uuid import UUID

from exceptions import ResourceNotFoundException
from interfaces import DBInterface
from models import Goal, Record


class GoalsDB(DBInterface):
    path = "backend/goals.db"

    def __init__(self) -> None:
        super().__init__()
        self.create_tables()

    def create_tables(self):
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
        goal: Goal,
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
                        str(goal.id),
                        goal.name,
                        goal.interval_start_date,
                        goal.interval_start_amount,
                        goal.interval_target_amount,
                        goal.interval_length.total_seconds(),
                        goal.bucket_size.total_seconds(),
                        goal.unit,
                        goal.reset,
                        goal.created_date,
                    ],
                )
                connection.commit()

    def get_goals(
        self,
    ) -> list[Goal]:
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
                    ORDER BY interval_start_date, created_date;
                    """,
                )
                return [
                    Goal(
                        id=row[0],
                        name=str(row[1]),
                        interval_start_date=row[2],
                        interval_start_amount=row[3],
                        interval_target_amount=row[4],
                        interval_length=timedelta(seconds=float(row[5])),
                        bucket_size=timedelta(seconds=float(row[6])),
                        unit=str(row[7]),
                        reset=row[8],
                        created_date=row[9],
                    )
                    for row in cursor.fetchall()
                ]

    def get_goal(
        self,
        goal_id: UUID,
    ) -> Goal:
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

                return Goal(
                    id=row[0],
                    name=str(row[1]),
                    interval_start_date=row[2],
                    interval_start_amount=row[3],
                    interval_target_amount=row[4],
                    interval_length=timedelta(seconds=float(row[5])),
                    bucket_size=timedelta(seconds=float(row[6])),
                    unit=str(row[7]),
                    reset=row[8],
                    created_date=row[9],
                )

    def delete_goal(
        self,
        goal_id: UUID,
    ):
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    DELETE FROM goals 
                    WHERE id=?
                    """,
                    [
                        str(goal_id),
                    ],
                )
                connection.commit()

    def create_record(
        self,
        record: Record,
    ):
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    INSERT INTO records(
                        id,
                        goal_id,
                        date,
                        amount,
                        created_date
                    ) VALUES(?,?,?,?,?);
                    """,
                    [
                        str(record.id),
                        str(record.goal_id),
                        record.date,
                        record.amount,
                        record.created_date,
                    ],
                )
                connection.commit()

    def get_records(
        self,
    ) -> list[Record]:
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    SELECT
                        id,
                        goal_id,
                        datetime(date,'localtime') as date,
                        amount,
                        datetime(created_date,'localtime') as created_date
                    FROM records
                    ORDER BY date, created_date;
                    """,
                )
                return [
                    Record(
                        id=row[0],
                        goal_id=row[1],
                        date=row[2],
                        amount=row[3],
                        created_date=row[4],
                    )
                    for row in cursor.fetchall()
                ]

    def get_record(
        self,
        record_id: UUID,
    ) -> Record:
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    SELECT
                        id,
                        goal_id,
                        datetime(date,'localtime') as date,
                        amount,
                        datetime(created_date,'localtime') as created_date
                    FROM records
                    WHERE id=? 
                    """,
                    [
                        str(record_id),
                    ],
                )

                row = cursor.fetchone()
                if row is None:
                    raise ResourceNotFoundException

                return Record(
                    id=row[0],
                    goal_id=row[1],
                    date=row[2],
                    amount=row[3],
                    created_date=row[4],
                )

    def delete_record(
        self,
        record_id: UUID,
    ):
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                cursor.execute(
                    """
                    DELETE FROM records 
                    WHERE id=?
                    """,
                    [
                        str(record_id),
                    ],
                )
                connection.commit()


goals_db = GoalsDB()

if __name__ == "__main__":
    print("\n == Create Goal == ")
    goals_db.create_goal(
        Goal(
            name="beep",
            interval_start_date=datetime(2023, 11, 13),
            interval_start_amount=0,
            interval_target_amount=1200,
            interval_length=timedelta(days=1),
            bucket_size=timedelta(minutes=5),
            unit="calories",
            reset=False,
        )
    )

    print("\n == Get Goals == ")
    goals = goals_db.get_goals()
    pprint(goals)

    print("\n == Get Goal == ")
    example_goal = goals[0]
    get_goal = goals_db.get_goal(example_goal.id)
    print(get_goal)

    print("\n == Delete Goal == ")
    previous_length = len(goals)
    goals_db.delete_goal(example_goal.id)
    new_length = len(goals_db.get_goals())
    if new_length >= previous_length:
        raise Exception
    print(f"new_length {new_length} < previous_length {previous_length}")

    print("\n == Create Record == ")
    if new_length == 0:
        goals_db.create_goal(
            Goal(
                name="boop",
                interval_start_date=datetime(2023, 10, 12),
                interval_start_amount=10,
                interval_target_amount=100,
                interval_length=timedelta(days=30),
                bucket_size=timedelta(hours=1),
                unit="pounds",
                reset=True,
            )
        )
    example_goal = goals_db.get_goals()[0]
    print(example_goal)
    goals_db.create_record(
        Record(
            goal_id=example_goal.id,
            date=datetime(2023, 12, 20, 2),
            amount=10,
        )
    )

    print("\n == Get Records == ")
    records = goals_db.get_records()
    pprint(records)

    print("\n == Get Record == ")
    example_record = records[0]
    get_record = goals_db.get_record(example_record.id)
    print(get_record)

    print("\n == Delete Record == ")
    previous_length = len(records)
    goals_db.delete_record(example_record.id)
    new_length = len(goals_db.get_records())
    if new_length >= previous_length:
        raise Exception
    print(f"new_length {new_length} < previous_length {previous_length}")
