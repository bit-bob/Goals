import logging
import sqlite3

from interfaces import DBInterface


class Connection:
    def __init__(
        self,
        path=None,
    ) -> None:
        self.path = path

    def __enter__(self):
        if self.path is None:
            raise Exception("Need a path")

        self.connection = sqlite3.connect(self.path)
        logging.debug("Connection to SQLite DB successful")

        self.cursor = self.connection.cursor()
        return self.cursor

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.cursor.close()


class GoalsDB(DBInterface):
    path = "backend/goals.db"

    def __init__(self) -> None:
        super().__init__()
        self.create_goals_table()
        self.create_records_table()

    def create_goals_table(self):
        with Connection(self.path) as c:
            c.execute(
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
        with Connection(self.path) as c:
            c.execute(
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
