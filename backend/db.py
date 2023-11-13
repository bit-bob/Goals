import sqlite3
from contextlib import closing

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
                        interval_length TEXT,
                        bucket_size TEXT,
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


if __name__ == "__main__":
    db = GoalsDB()
