from uuid import UUID

from models import GoalsModel, RecordsModel


class DBInterface:
    path = None

    def create_tables(self):
        raise NotImplementedError

    def create_goal(
        self,
        goal: GoalsModel,
    ):
        raise NotImplementedError

    def get_goals(
        self,
    ) -> list[GoalsModel]:
        raise NotImplementedError

    def get_goal(
        self,
        goal_id: UUID,
    ) -> GoalsModel:
        raise NotImplementedError

    def delete_goal(
        self,
        goal_id: UUID,
    ):
        raise NotImplementedError

    def create_record(
        self,
        record: RecordsModel,
    ):
        raise NotImplementedError

    def get_records(
        self,
    ) -> list[RecordsModel]:
        raise NotImplementedError

    def get_record(
        self,
        record_id: UUID,
    ) -> RecordsModel:
        raise NotImplementedError

    def delete_record(
        self,
        record_id: UUID,
    ):
        raise NotImplementedError
