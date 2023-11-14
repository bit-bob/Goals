from uuid import UUID

from models import Goal, Record


class DBInterface:
    path = None

    def create_tables(self):
        raise NotImplementedError

    def create_goal(
        self,
        goal: Goal,
    ):
        raise NotImplementedError

    def get_goals(
        self,
    ) -> list[Goal]:
        raise NotImplementedError

    def get_goal(
        self,
        goal_id: UUID,
    ) -> Goal:
        raise NotImplementedError

    def delete_goal(
        self,
        goal_id: UUID,
    ):
        raise NotImplementedError

    def create_record(
        self,
        record: Record,
    ):
        raise NotImplementedError

    def get_records(
        self,
    ) -> list[Record]:
        raise NotImplementedError

    def get_record(
        self,
        record_id: UUID,
    ) -> Record:
        raise NotImplementedError

    def delete_record(
        self,
        record_id: UUID,
    ):
        raise NotImplementedError
