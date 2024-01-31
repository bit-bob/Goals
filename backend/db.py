import sqlite3
from contextlib import closing
from datetime import datetime, timedelta, timezone
from typing import Optional
from uuid import UUID

from dates import datetime_now
from exceptions import ResourceNotFoundException
from interfaces import DBInterface
from models import Goal, Record


def read_date(date_str: str) -> datetime:
    return datetime.strptime(date_str, "%Y-%m-%d %H:%M:%S").astimezone(timezone.utc)


def get_goal_progress(
    start_amount: float,
    end_amount: float,
    start_time: datetime,
    interval_length: timedelta,
    current_time: datetime,
) -> float:
    percentage = (current_time - start_time) / interval_length
    return start_amount + percentage * (end_amount - start_amount)


def read_goal(row) -> Goal:
    id = UUID(row[0])
    name = str(row[1])

    interval_start_amount = row[3]
    interval_target_amount = row[4]

    interval_start_date = read_date(row[2])
    interval_length = timedelta(seconds=float(row[5]))

    bucket_size = timedelta(seconds=float(row[6]))
    unit = str(row[7])
    reset = bool(row[8])

    created_date = read_date(row[9])

    progress = interval_start_amount
    if row[10] is not None:
        progress += row[10]

    goal_progress = get_goal_progress(
        start_amount=interval_start_amount,
        end_amount=interval_target_amount,
        start_time=interval_start_date,
        interval_length=interval_length,
        current_time=datetime_now(),
    )

    return Goal(
        id=id,
        name=name,
        interval_start_date=interval_start_date,
        interval_start_amount=interval_start_amount,
        interval_target_amount=interval_target_amount,
        interval_length=interval_length,
        bucket_size=bucket_size,
        unit=unit,
        reset=reset,
        created_date=created_date,
        progress=progress,
        goal_progress=goal_progress,
    )


def read_record(row) -> Record:
    id = UUID(row[0])
    goal_id = UUID(row[1])
    date = read_date(row[2])
    amount = float(row[3])
    created_date = read_date(row[4])
    progress = float(row[5]) if row[5] is not None else 0

    return Record(
        id=id,
        goal_id=goal_id,
        date=date,
        amount=amount,
        created_date=created_date,
        progress=progress,
    )


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
                connection.execute("PRAGMA foreign_keys = ON")
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
                connection.execute("PRAGMA foreign_keys = ON")
                cursor.execute(
                    """
                    CREATE TABLE IF NOT EXISTS records (
                        id TEXT PRIMARY KEY,
                        goal_id TEXT,
                        date TEXT,
                        amount REAL,
                        created_date TEXT DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE
                    );
                    """
                )

    def create_goal(
        self,
        goal: Goal,
    ):
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                connection.execute("PRAGMA foreign_keys = ON")
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
                connection.execute("PRAGMA foreign_keys = ON")
                cursor.execute(
                    """
                    SELECT
                        goals.id,
                        goals.name,
                        datetime(goals.interval_start_date,'utc') as interval_start_date,
                        goals.interval_start_amount,
                        goals.interval_target_amount,
                        goals.interval_length_seconds,
                        goals.bucket_size_seconds,
                        goals.unit,
                        goals.reset,
                        datetime(goals.created_date,'utc') as created_date,
                        SUM(records.amount) as progress
                    FROM 
                        goals
                    LEFT OUTER JOIN
                        records ON goals.id = records.goal_id
                    GROUP BY
                        goals.id
                    ORDER BY 
                        interval_start_date, 
                        created_date
                    ;
                    """,
                )

                return [read_goal(row) for row in cursor.fetchall()]

    def get_goal(
        self,
        goal_id: UUID,
    ) -> Goal:
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                connection.execute("PRAGMA foreign_keys = ON")
                cursor.execute(
                    """
                    SELECT
                        goals.id,
                        goals.name,
                        datetime(goals.interval_start_date,'utc') as interval_start_date,
                        goals.interval_start_amount,
                        goals.interval_target_amount,
                        goals.interval_length_seconds,
                        goals.bucket_size_seconds,
                        goals.unit,
                        goals.reset,
                        datetime(goals.created_date,'utc') as created_date,
                        SUM(records.amount) as progress
                    FROM 
                        goals
                    LEFT OUTER JOIN
                        records ON goals.id = records.goal_id
                    WHERE
                        goals.id=?
                    GROUP BY
                        goals.id
                    ORDER BY 
                        interval_start_date, 
                        created_date
                    ;
                    """,
                    [
                        str(goal_id),
                    ],
                )

                row = cursor.fetchone()
                if row is None:
                    raise ResourceNotFoundException(
                        message=f"Goal not found for id={goal_id}"
                    )

                return read_goal(row)

    def update_goal(
        self,
        goal: Goal,
    ) -> Goal:
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                connection.execute("PRAGMA foreign_keys = ON")
                cursor.execute(
                    """
                    UPDATE goals
                    SET name = ?,
                        interval_start_date = ?,
                        interval_start_amount = ?,
                        interval_target_amount = ?,
                        interval_length_seconds = ?,
                        bucket_size_seconds = ?,
                        unit = ?,
                        reset = ?,
                        created_date = ?
                    WHERE id = ?
                    RETURNING *;
                    """,
                    [
                        goal.name,
                        goal.interval_start_date,
                        goal.interval_start_amount,
                        goal.interval_target_amount,
                        goal.interval_length.total_seconds(),
                        goal.bucket_size.total_seconds(),
                        goal.unit,
                        goal.reset,
                        goal.created_date,
                        str(goal.id),
                    ],
                )

                row = cursor.fetchone()
                if row is None:
                    raise ResourceNotFoundException(
                        message=f"Goal not found for id={goal.id}"
                    )
                connection.commit()

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
                connection.execute("PRAGMA foreign_keys = ON")
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
                connection.execute("PRAGMA foreign_keys = ON")
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
                connection.execute("PRAGMA foreign_keys = ON")
                cursor.execute(
                    """
                    SELECT
                        id,
                        goal_id,
                        datetime(date,'utc') as date,
                        amount,
                        datetime(created_date,'utc') as created_date,
                        SUM (amount) OVER (PARTITION BY goal_id ORDER BY date) as progress   
                    FROM 
                        records
                    ORDER BY 
                        date, 
                        created_date
                    ;
                    """,
                )
                return [read_record(row) for row in cursor.fetchall()]

    def get_records_for_goal(
        self,
        goal_id: UUID,
        interval_start_date: Optional[datetime] = None,
        interval_end_date: Optional[datetime] = None,
    ) -> list[Record]:
        where_clause = ""
        args = [
            str(goal_id),
        ]

        if interval_start_date is not None:
            if interval_end_date is not None:
                where_clause = "goal_id=? AND date>=? AND date<=?"
                args = [
                    str(goal_id),
                    interval_start_date,
                    interval_end_date,
                ]
            else:
                where_clause = "goal_id=? AND date>=?"
                args = [
                    str(goal_id),
                    interval_start_date,
                ]
        else:
            if interval_end_date is not None:
                where_clause = "goal_id=? AND date<=?"
                args = [
                    str(goal_id),
                    interval_end_date,
                ]
            else:
                where_clause = "goal_id=?"
                args = [
                    str(goal_id),
                ]

        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                connection.execute("PRAGMA foreign_keys = ON")
                cursor.execute(
                    f"""
                    SELECT
                        id,
                        goal_id,
                        datetime(date,'utc') as date,
                        amount,
                        datetime(created_date,'utc') as created_date,
                        SUM (amount) OVER (PARTITION BY goal_id ORDER BY date) as progress
                    FROM 
                        records
                    WHERE 
                        {where_clause}
                    ORDER BY 
                        date, 
                        created_date
                    ;
                    """,
                    args,
                )
                return [read_record(row) for row in cursor.fetchall()]

    def get_record(
        self,
        record_id: UUID,
    ) -> Record:
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                connection.execute("PRAGMA foreign_keys = ON")
                cursor.execute(
                    """
                    SELECT
                        id,
                        goal_id,
                        datetime(date,'utc') as date,
                        amount,
                        datetime(created_date,'utc') as created_date,
                        SUM (amount) OVER (PARTITION BY goal_id ORDER BY date) as progress
                    FROM 
                        records
                    WHERE 
                        id=? 
                    """,
                    [
                        str(record_id),
                    ],
                )

                row = cursor.fetchone()
                if row is None:
                    raise ResourceNotFoundException(
                        message=f"Record not found for id={record_id}"
                    )

                return read_record(row)

    def delete_record(
        self,
        record_id: UUID,
    ):
        with closing(sqlite3.connect(self.path)) as connection:
            with closing(connection.cursor()) as cursor:
                connection.execute("PRAGMA foreign_keys = ON")
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

    print("\n == Get Goal == ")
    example_goal = goals[0]

    get_goal = goals_db.get_goal(example_goal.id)

    print("\n == Update Goal == ")
    example_goal.name = "plop"

    updated_goal = goals_db.update_goal(goal=example_goal)

    get_updated_goal = goals_db.get_goal(example_goal.id)
    assert (
        updated_goal == get_updated_goal
    ), f"Failed to update goal\n updated_goal should equal get_updated_goal\n updated_goal = {updated_goal}\n get_updated_goal = {get_updated_goal}"

    print("\n == Delete Goal == ")
    previous_length_goals = len(goals)

    goals_db.delete_goal(example_goal.id)

    length_goals = len(goals_db.get_goals())
    assert (
        length_goals < previous_length_goals
    ), f"Failed to delete goal\n length_goals should be less than previous_length_goals\n length_goals = {length_goals}\n previous_length_goals = {previous_length_goals}"

    print("\n == Create Record == ")
    if length_goals == 0:
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
    goals_db.create_record(
        Record(
            goal_id=example_goal.id,
            date=datetime(2023, 12, 20, 2),
            amount=10,
        )
    )

    print("\n == Get Records == ")
    records = goals_db.get_records()

    print("\n == Get Record == ")
    example_record = records[0]

    get_record = goals_db.get_record(example_record.id)

    print("\n == Get Records For Goal == ")
    example_record = records[0]

    get_records_for_goal = goals_db.get_records_for_goal(goal_id=example_record.goal_id)

    num_records_for_goal = len(get_records_for_goal)
    record_for_goal = get_records_for_goal[0]
    assert (
        num_records_for_goal == 1
    ), f"Failed to get record for goal\n expected one record, got {num_records_for_goal}"
    assert (
        example_record == record_for_goal
    ), f"Failed to get record for goal\n example_record should equal record_for_goal\n example_record = {example_record}\n record_for_goal = {record_for_goal}"

    print("\n == Cascade Delete Records when Deleting Goals == ")
    previous_length_records = len(goals_db.get_records())

    goals_db.delete_goal(example_goal.id)

    length_records = len(goals_db.get_records())
    assert (
        length_records < previous_length_records
    ), f"Failed to cascade delete goals\n length_records should be less than previous_length_records\n length_records = {length_records}\n previous_length_records = {previous_length_records}"
    length_records_for_goal = len(
        goals_db.get_records_for_goal(goal_id=example_goal.id)
    )
    assert (
        length_records_for_goal == 0
    ), f"Failed to cascade delete goals\n length_records_for_goal should be length_records_for_goal\n length_records_for_goal = {length_records_for_goal}"

    print("\n == Delete Record == ")
    previous_length_records = len(records)

    goals_db.delete_record(example_record.id)

    length_records = len(goals_db.get_records())
    assert (
        length_records < previous_length_records
    ), f"Failed to delete record\n length_records should be less than previous_length_records\n length_records = {length_records}\n previous_length_records = {previous_length_records}"
