import logging
import sys
from datetime import datetime, timezone
from enum import Enum
from typing import Generator, List, Optional


class EnumWithTitle(Enum):
    @property
    def title(self):
        return self.name.title().replace("_", " ")


class TaskEventType(EnumWithTitle):
    CREATE = 0
    START = 1
    PAUSE = 2
    COMPLETE = 3
    DROP = 4


class TaskEvent:
    def __init__(
        self,
        date_args: Optional[List[int]] = None,
        type: Optional[TaskEventType] = None,
    ) -> None:
        if self._type is None:
            self._type = type

        if date_args is None:
            self._date = None
        else:
            self._date = datetime(*date_args, tzinfo=timezone.utc)

    def __str__(self) -> str:
        return f"Event({'type=' + self._type.name if self._type is not None else ''} date={self._date})"

    @property
    def date(self) -> Optional[datetime]:
        return self._date

    @property
    def is_create(self) -> bool:
        return self._type == TaskEventType.CREATE

    @property
    def is_start(self) -> bool:
        return self._type == TaskEventType.START

    @property
    def is_pause(self) -> bool:
        return self._type == TaskEventType.PAUSE

    @property
    def is_complete(self) -> bool:
        return self._type == TaskEventType.COMPLETE

    @property
    def is_drop(self) -> bool:
        return self._type == TaskEventType.DROP

    @property
    def is_in_future(self) -> bool:
        if self.date is None:
            return False

        now = datetime.now().replace(tzinfo=timezone.utc)
        return self.date > now


class TaskEventStart(TaskEvent):
    _type = TaskEventType.START


class TaskEventPause(TaskEvent):
    _type = TaskEventType.PAUSE


class TaskEventComplete(TaskEvent):
    _type = TaskEventType.COMPLETE


class TaskEventDrop(TaskEvent):
    _type = TaskEventType.DROP


class TaskStatus(EnumWithTitle):
    NOT_STARTED = 1
    IN_PROGRESS = 2
    COMPLETE = 3
    ON_HOLD = 4


class RepetitionCycle(EnumWithTitle):
    DAILY = 1
    WEEKLY = 7
    MONTHLY = 30


class Priority(EnumWithTitle):
    LOWEST = 1
    WAITING = 2
    LOW = 4
    MEDIUM = 8
    HIGH = 16
    HIGHEST = 32


class Task:
    def __init__(
        self,
        name: str,
        children: Optional[List["Task"]] = None,
        events: Optional[List[TaskEvent]] = None,
        priority: Optional[Priority] = None,
    ) -> None:
        self._name = name

        self._parents = []
        self._children = children
        if self._children is not None:
            for child in self._children:
                child._parents.append(self)

        self._events = events
        self._priority = priority

    def __str__(self) -> str:
        return f"{self.path} ({self.status.name})"

    @property
    def name(self) -> str:
        return self._name

    @property
    def parents(self) -> List["Task"]:
        return self._parents

    @property
    def children(self) -> Optional[List["Task"]]:
        return self._children

    @property
    def status(self) -> TaskStatus:
        if self.priority == Priority.LOWEST:
            return TaskStatus.ON_HOLD

        if self._events is None or len(self._events) == 0:
            return TaskStatus.NOT_STARTED

        last_started = self.last_started_event
        if last_started is not None:
            if last_started.is_in_future:
                return TaskStatus.ON_HOLD

        last_completed = self.last_completed_date
        if last_completed is not None:
            return TaskStatus.COMPLETE

        return TaskStatus.IN_PROGRESS

    @property
    def is_on_hold(self) -> bool:
        return self.status == TaskStatus.ON_HOLD

    @property
    def is_not_started(self) -> bool:
        return self.status == TaskStatus.NOT_STARTED

    @property
    def is_in_progress(self) -> bool:
        return self.status == TaskStatus.IN_PROGRESS

    @property
    def is_complete(self) -> bool:
        return self.status == TaskStatus.COMPLETE

    @property
    def is_waiting(self) -> bool:
        return self.priority == Priority.WAITING

    @property
    def last_started_event(self) -> Optional["TaskEvent"]:
        if self._events is not None and len(self._events) > 0:
            for event in reversed(self._events):
                if event.is_start:
                    return event

    @property
    def last_started_date(self) -> Optional[datetime]:
        last_started_event = self.last_started_event
        if last_started_event is not None:
            return last_started_event.date

    @property
    def last_completed_event(self) -> Optional["TaskEvent"]:
        if self._events is not None and len(self._events) > 0:
            for event in reversed(self._events):
                if event.is_complete:
                    return event

    @property
    def last_completed_date(self) -> Optional[datetime]:
        last_completed_event = self.last_completed_event
        if last_completed_event is not None:
            return last_completed_event.date

    @property
    def path(self) -> str:
        if self._parents is None or len(self._parents) == 0:
            return f"{self.name}"
        else:
            return f"{' - '.join([p.path for p in self._parents])} - {self.name}"

    @property
    def priority(self) -> Priority:
        if self._priority is not None:
            return self._priority

        if self.parents is not None:
            for parent in self.parents:
                return parent.priority

        return Priority.MEDIUM


runna_task = Task(
    "Goals",
    children=[
        Task(
            "Backend",
            children=[
                Task(
                    "Models",
                    priority=Priority.HIGH,
                    children=[
                        Task(
                            "Goals Model",
                            children=[
                                Task(
                                    "id: UUID = uuid4()",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                                Task(
                                    "name: str = 'calories",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                                Task(
                                    "interval start date: datetime = now",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                                Task(
                                    "interval start amount: double = 0",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                                Task(
                                    "interval target amount: double = 1200",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                                Task(
                                    "interval length: timedelta = 1 day",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                                Task(
                                    "bucket size: timedelta = 5 minutes",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                                Task(
                                    "unit: str = 'calories'",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                                Task(
                                    "reset: bool = 'false'",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                            ],
                            events=[
                                TaskEventStart([2023, 11, 13, 14, 12]),
                                TaskEventComplete([2023, 11, 13, 14, 19]),
                            ],
                        ),
                        Task(
                            "Records Model",
                            children=[
                                Task(
                                    "id: UUID = uuid4()",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 25]),
                                    ],
                                ),
                                Task(
                                    "goal id: UUID",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 25]),
                                    ],
                                ),
                                Task(
                                    "date: datetime = now",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 25]),
                                    ],
                                ),
                                Task(
                                    "amount: double = 0",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 14, 25]),
                                    ],
                                ),
                            ],
                            events=[
                                TaskEventStart([2023, 11, 13, 14, 19]),
                                TaskEventComplete([2023, 11, 13, 14, 25]),
                            ],
                        ),
                    ],
                ),
                Task(
                    "Database",
                    priority=Priority.HIGH,
                    children=[
                        Task(
                            "Structure",
                            children=[
                                Task(
                                    "define the interface",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 15, 1]),
                                    ],
                                ),
                                Task(
                                    "handle connections",
                                    children=[
                                        Task(
                                            "make the connection",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 15, 1]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "make connection closing more consistent / explicit",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 15, 32]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 15, 50]
                                                ),
                                            ],
                                        ),
                                    ],
                                ),
                                Task(
                                    "make the tables",
                                    events=[
                                        TaskEventComplete([2023, 11, 13, 15, 1]),
                                    ],
                                ),
                            ],
                            events=[
                                TaskEventStart([2023, 11, 13, 14, 27]),
                                TaskEventComplete([2023, 11, 13, 15, 1]),
                            ],
                        ),
                        Task(
                            "Add functions",
                            children=[
                                Task(
                                    "Goals",
                                    children=[
                                        Task(
                                            "Create",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 15, 53]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 16, 24]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Get all",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 16, 24]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 16, 43]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Get one",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 16, 43]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 16, 54]
                                                ),
                                            ],
                                        ),
                                        # Task(
                                        #     "Update",
                                        # ),
                                        Task(
                                            "Delete",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 16, 59]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 17, 6]
                                                ),
                                            ],
                                        ),
                                    ],
                                ),
                                Task(
                                    "Records",
                                    children=[
                                        Task(
                                            "Create",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 17, 25]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 17, 33]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Get all",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 17, 33]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 17, 42]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Get one",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 17, 42]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 17, 46]
                                                ),
                                            ],
                                        ),
                                        # Task(
                                        #     "Update",
                                        # ),
                                        Task(
                                            "Delete",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 17, 47]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 17, 49]
                                                ),
                                            ],
                                        ),
                                    ],
                                ),
                            ],
                        ),
                    ],
                ),
                Task(
                    "API",
                    priority=Priority.HIGH,
                    children=[
                        Task(
                            "Structure",
                            events=[
                                TaskEventStart([2023, 11, 13, 17, 54]),
                                TaskEventComplete([2023, 11, 13, 18, 10]),
                            ],
                        ),
                        Task(
                            "Endpoints",
                            children=[
                                Task(
                                    "Goals",
                                    children=[
                                        Task(
                                            "Create",
                                            events=[
                                                TaskEventStart([2023, 11, 13, 16, 10]),
                                                TaskEventComplete(
                                                    [2023, 11, 13, 18, 21]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Get all",
                                        ),
                                        Task(
                                            "Get one",
                                        ),
                                        # Task(
                                        #     "Update",
                                        # ),
                                        Task(
                                            "Delete",
                                        ),
                                        Task(
                                            "Get Progress Interval(goal_id: str, start_time: datetime, end_time: datetime) -> (start_amount: double, records_in_interval: List[Records])",
                                            # if we have many records for a given goal
                                            # the goal started on the 1st of January
                                            # the interval is 1 day and accrual amount is 1200 cal
                                            # the bucket / increment interval is 5 mins
                                            # we had records on the 10th, 12th, 18th January and 6th Feburary
                                            # today is the 18th February
                                            #
                                            # the front end wants a list of all records in a period of time
                                            # given a time like Jan 5th 5pm
                                            # the start and
                                        ),
                                    ],
                                ),
                                Task(
                                    "Records",
                                    children=[
                                        Task(
                                            "Create",
                                        ),
                                        Task(
                                            "Get all",
                                        ),
                                        Task(
                                            "Get one",
                                        ),
                                        # Task(
                                        #     "Update",
                                        # ),
                                        Task(
                                            "Delete",
                                        ),
                                    ],
                                ),
                            ],
                        ),
                    ],
                ),
            ],
        ),
        Task(
            "Cleanup",
            children=[
                Task(
                    "Naming",
                    children=[
                        Task(
                            "Pick better names",
                            children=[
                                Task(
                                    "'bucket' is too technical / not intuitive",
                                ),
                            ],
                        ),
                        Task(
                            "Make sure names are consistent between the front and back ends",
                        ),
                    ],
                ),
                Task(
                    "Data Types",
                    children=[
                        Task(
                            "Make sure you're using doubles wherever floating point errors might be a problem"
                        ),
                    ],
                ),
            ],
        ),
    ],
)


def get_grandchildren(
    task: Task,
):
    if task.children is None:
        yield task
    else:
        for child in task.children:
            yield from get_grandchildren(child)


def get_next_task(
    tasks_included: List[Task],
    priorities_included: Optional[List[Priority]] = None,
    statuses_included: Optional[List[TaskStatus]] = None,
    num_tasks_to_show: Optional[int] = None,
) -> Generator:
    tasks_grouped: dict[TaskStatus, dict[Priority, list[Task]]] = {
        s: {p: [] for p in Priority} for s in TaskStatus
    }

    for demo_task in tasks_included:
        for child in get_grandchildren(demo_task):
            tasks_grouped[child.status][child.priority].append(child)

    for priority in reversed(Priority):
        if priorities_included is not None:
            if priority not in priorities_included:
                continue

        for status in reversed(TaskStatus):
            if statuses_included is not None:
                if status not in statuses_included:
                    continue

            printed_heading = False
            for task in tasks_grouped[status][priority]:
                if num_tasks_to_show is not None:
                    if num_tasks_to_show == 0:
                        break
                    num_tasks_to_show = num_tasks_to_show - 1

                if not printed_heading:
                    heading_body = f"{status.title}"
                    if not task.is_on_hold:
                        heading_body = f"{heading_body}, {priority.title}"
                        if not task.is_waiting:
                            heading_body = f"{heading_body} Priority"

                    logging.debug(f"\n == {heading_body} == ")
                    printed_heading = True

                yield task.path


if __name__ == "__main__":
    # setup logs
    logging.basicConfig(
        level=logging.DEBUG,
        format="%(message)s",
        handlers=[logging.StreamHandler(sys.stdout)],
    )

    logging.debug(f"\n\n\n ==== TASKS ({datetime.now():%Y %b %d, %H:%M}) ==== ")

    # num_tasks_to_show = 1

    for task in get_next_task(
        [
            runna_task,
        ],
        priorities_included=[
            Priority.HIGHEST,
            Priority.HIGH,
            # Priority.MEDIUM,
            # Priority.LOW,
            # Priority.LOWEST,
            # Priority.WAITING,
        ],
        statuses_included=[
            TaskStatus.NOT_STARTED,
            TaskStatus.IN_PROGRESS,
            # TaskStatus.COMPLETE,
            # TaskStatus.ON_HOLD,
        ],
        # num_tasks_to_show=num_tasks_to_show,
    ):
        logging.debug(task)
