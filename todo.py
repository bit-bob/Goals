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


main_task = Task(
    "Goals",
    children=[
        Task(
            "V0",
            children=[
                Task(
                    "Backend",
                    children=[
                        Task(
                            "Models",
                            priority=Priority.HIGH,
                            children=[
                                Task(
                                    "Goals",
                                    children=[
                                        Task(
                                            "id: UUID = uuid4()",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 19]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "name: str = 'calories",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 19]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "interval start date: datetime = now",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 19]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "interval start amount: double = 0",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 19]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "interval target amount: double = 1200",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 19]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "interval length: timedelta = 1 day",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 19]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "bucket size: timedelta = 5 minutes",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 19]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "unit: str = 'calories'",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 19]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "reset: bool = 'false'",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 19]
                                                ),
                                            ],
                                        ),
                                    ],
                                    events=[
                                        TaskEventStart([2023, 11, 13, 14, 12]),
                                        TaskEventComplete([2023, 11, 13, 14, 19]),
                                    ],
                                ),
                                Task(
                                    "Records",
                                    children=[
                                        Task(
                                            "id: UUID = uuid4()",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 25]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "goal id: UUID",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 25]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "date: datetime = now",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 25]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "amount: double = 0",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 13, 14, 25]
                                                ),
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
                                                TaskEventComplete(
                                                    [2023, 11, 13, 15, 1]
                                                ),
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
                                                        TaskEventStart(
                                                            [2023, 11, 13, 15, 32]
                                                        ),
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
                                                TaskEventComplete(
                                                    [2023, 11, 13, 15, 1]
                                                ),
                                            ],
                                        ),
                                    ],
                                    events=[
                                        TaskEventStart([2023, 11, 13, 14, 27]),
                                        TaskEventComplete([2023, 11, 13, 15, 1]),
                                    ],
                                ),
                                Task(
                                    "Functions",
                                    children=[
                                        Task(
                                            "Goals",
                                            children=[
                                                Task(
                                                    "Create",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 15, 53]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 16, 24]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get all",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 16, 24]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 16, 43]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get one",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 16, 43]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 16, 54]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Update",
                                                ),
                                                Task(
                                                    "Delete",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 16, 59]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 17, 6]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get records",
                                                    events=[
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 17, 23]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get progress",
                                                    events=[
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 17, 23]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Delete related records when deleting goals",
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Records",
                                            children=[
                                                Task(
                                                    "Create",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 17, 25]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 17, 33]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get all",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 17, 33]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 17, 42]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get one",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 17, 42]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 17, 46]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Update",
                                                ),
                                                Task(
                                                    "Delete",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 17, 47]
                                                        ),
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
                                                        TaskEventStart(
                                                            [2023, 11, 13, 16, 10]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 18, 21]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get all",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 18, 42]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 18, 51]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get one",
                                                    events=[
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 17, 23]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Update",
                                                ),
                                                Task(
                                                    "Delete",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 13, 18, 59]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 13, 19, 5]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get records",
                                                    events=[
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 17, 23]
                                                        ),
                                                    ],
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
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 14, 15, 34]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 17, 23]
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
                                                        TaskEventStart(
                                                            [2023, 11, 14, 15, 28]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 15, 34]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get all",
                                                    events=[
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 15, 34]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Get one",
                                                ),
                                                Task(
                                                    "Update",
                                                ),
                                                Task(
                                                    "Delete",
                                                    events=[
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 15, 34]
                                                        ),
                                                    ],
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Fix API endpoint paths. See https://restfulapi.net/resource-naming/",
                                            children=[
                                                Task(
                                                    "Avoid CRUD descriptions like create, instead use HTTP request methods to know which function is performed",
                                                    children=[
                                                        Task(
                                                            "create -> post(/resource)",
                                                            events=[
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        14,
                                                                        13,
                                                                        22,
                                                                    ]
                                                                ),
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        14,
                                                                        13,
                                                                        26,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                        Task(
                                                            "read all -> get(/resource)",
                                                            events=[
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        14,
                                                                        13,
                                                                        26,
                                                                    ]
                                                                ),
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        14,
                                                                        13,
                                                                        29,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                        Task(
                                                            "read one -> get(/resource/{id})",
                                                        ),
                                                        Task(
                                                            "update -> put(/resource/{id})",
                                                        ),
                                                        Task(
                                                            "delete -> delete(/resource/{id})",
                                                            events=[
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        14,
                                                                        13,
                                                                        29,
                                                                    ]
                                                                ),
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        14,
                                                                        13,
                                                                        37,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                    ],
                                                )
                                            ],
                                        ),
                                        Task(
                                            "Fix API endpoint return types",
                                            children=[
                                                Task(
                                                    "create -> created_resource",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 14, 13, 38]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 14, 5]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "read all -> list[resources]",
                                                    events=[
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 14, 5]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "read one -> resource",
                                                ),
                                                Task(
                                                    "update -> updated_resource",
                                                ),
                                                Task(
                                                    "delete -> None",
                                                    events=[
                                                        TaskEventComplete(
                                                            [2023, 11, 14, 14, 5]
                                                        ),
                                                    ],
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Add Tests",
                                            children=[
                                                Task(
                                                    "Goals",
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
                                                        Task(
                                                            "Get records",
                                                        ),
                                                        Task(
                                                            "Get progress",
                                                        ),
                                                        Task(
                                                            "Update",
                                                        ),
                                                        Task(
                                                            "Delete",
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
                                                        Task(
                                                            "Update",
                                                        ),
                                                        Task(
                                                            "Delete",
                                                        ),
                                                    ],
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Add Validation",
                                            priority=Priority.LOW,
                                            children=[
                                                Task(
                                                    "Goals",
                                                ),
                                                Task(
                                                    "Records",
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
                    "Use the app",
                    priority=Priority.HIGH,
                    children=[
                        Task(
                            "Setup the app on your phone",
                            children=[
                                Task(
                                    "pull changes",
                                    events=[
                                        TaskEventComplete([2023, 11, 16, 16, 30]),
                                    ],
                                ),
                                Task(
                                    "build `capacitor-plugin-goals-widget-bridge`",
                                    children=[
                                        Task(
                                            "npm install",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 16, 16, 30]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "npm run build",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 16, 16, 30]
                                                ),
                                            ],
                                        ),
                                    ],
                                ),
                                Task(
                                    "build `frontend`",
                                    children=[
                                        Task(
                                            "npm install",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 16, 16, 30]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "npm run build",
                                            events=[
                                                TaskEventComplete(
                                                    [2023, 11, 16, 16, 30]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "npx cap sync ios",
                                            # N.B. you need to run this every time you've made changes to the frontend and rebuild it
                                            children=[
                                                Task(
                                                    "Update the Xcode in the app store to get a newer version of the command line tool xcodebuild. current version 14.2, needs 15.x",
                                                    children=[
                                                        Task(
                                                            "Update your macOS version to 14.X",
                                                            events=[
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        16,
                                                                        16,
                                                                        48,
                                                                    ]
                                                                ),
                                                                TaskEventPause(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        16,
                                                                        16,
                                                                        55,
                                                                    ]
                                                                ),
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        16,
                                                                        17,
                                                                        57,
                                                                    ]
                                                                ),
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        16,
                                                                        18,
                                                                        31,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                        Task(
                                                            "Update Xcode",
                                                            events=[
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        16,
                                                                        19,
                                                                        43,
                                                                    ]
                                                                ),
                                                                TaskEventPause(
                                                                    [2023, 11, 16, 20]
                                                                ),
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        16,
                                                                        39,
                                                                    ]
                                                                ),
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        17,
                                                                        12,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                        Task(
                                                            "fix xcodebuild",
                                                            # ✖ update ios - failed!
                                                            # [error] xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory
                                                            #         '/Library/Developer/CommandLineTools' is a command line tools instance
                                                            children=[
                                                                Task(
                                                                    "Install Command Line Tools if you haven't already with `xcode-select --install`",
                                                                    # xcode-select: note: Command line tools are already installed. Use "Software Update" in System Settings or the softwareupdate command line interface to install updates
                                                                    events=[
                                                                        TaskEventStart(
                                                                            [
                                                                                2023,
                                                                                11,
                                                                                18,
                                                                                17,
                                                                                12,
                                                                            ]
                                                                        ),
                                                                        TaskEventComplete(
                                                                            [
                                                                                2023,
                                                                                11,
                                                                                18,
                                                                                17,
                                                                                18,
                                                                            ]
                                                                        ),
                                                                    ],
                                                                ),
                                                                Task(
                                                                    "Enable command line tools with `sudo xcode-select --switch /Library/Developer/CommandLineTools`",
                                                                    events=[
                                                                        TaskEventStart(
                                                                            [
                                                                                2023,
                                                                                11,
                                                                                18,
                                                                                17,
                                                                                18,
                                                                            ]
                                                                        ),
                                                                        TaskEventComplete(
                                                                            [
                                                                                2023,
                                                                                11,
                                                                                18,
                                                                                17,
                                                                                19,
                                                                            ]
                                                                        ),
                                                                    ],
                                                                ),
                                                                Task(
                                                                    "try again",
                                                                    # failed again
                                                                    events=[
                                                                        TaskEventStart(
                                                                            [
                                                                                2023,
                                                                                11,
                                                                                18,
                                                                                17,
                                                                                19,
                                                                            ]
                                                                        ),
                                                                        TaskEventComplete(
                                                                            [
                                                                                2023,
                                                                                11,
                                                                                18,
                                                                                17,
                                                                                20,
                                                                            ]
                                                                        ),
                                                                    ],
                                                                ),
                                                                Task(
                                                                    "try `sudo xcode-select --switch /Applications/Xcode.app`",
                                                                    # this fixed it
                                                                    events=[
                                                                        TaskEventStart(
                                                                            [
                                                                                2023,
                                                                                11,
                                                                                18,
                                                                                17,
                                                                                20,
                                                                            ]
                                                                        ),
                                                                        TaskEventComplete(
                                                                            [
                                                                                2023,
                                                                                11,
                                                                                18,
                                                                                17,
                                                                                31,
                                                                            ]
                                                                        ),
                                                                    ],
                                                                ),
                                                            ],
                                                        ),
                                                        Task(
                                                            "npx cap sync ios",
                                                            events=[
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        17,
                                                                        31,
                                                                    ]
                                                                ),
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        17,
                                                                        32,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                    ],
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "npx cap open ios",
                                            events=[
                                                TaskEventStart([2023, 11, 18, 17, 31]),
                                                TaskEventComplete(
                                                    [2023, 11, 18, 17, 32]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Fix the missing scheme",
                                            children=[
                                                Task(
                                                    "Wait for Xcode to finish updating",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 18, 17, 32]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 18, 17, 51]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Close Xcode and try `npx cap open ios` again",
                                                    # this worked
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 18, 17, 51]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 18, 17, 54]
                                                        ),
                                                    ],
                                                ),
                                            ],
                                        ),
                                    ],
                                ),
                                Task(
                                    "Sync to your phone",
                                    children=[
                                        Task(
                                            "Try to sync",
                                            # failed due to `unable to open configuration settings file`
                                            events=[
                                                TaskEventStart([2023, 11, 18, 17, 54]),
                                                TaskEventComplete(
                                                    [2023, 11, 18, 18, 3]
                                                ),
                                            ],
                                        ),
                                        Task(
                                            "Fix `# failed due to `unable to open configuration settings file`",
                                            children=[
                                                Task(
                                                    "try `cd frontend/ios/App; open App.xcworkspace`",
                                                    # didn't work
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 18, 18, 3]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 18, 18, 9]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "try `pod install` in `frontend/ios/App`",
                                                    # zsh: command not found: pod
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 18, 18, 9]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 18, 18, 12]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Instal `pod` with `brew install cocoapods`",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 18, 18, 12]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 18, 18, 17]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "try `pod install` in `frontend/ios/App`",
                                                    # looks like it worked with some warnings
                                                    # [!] The `App [Debug]` target overrides the `ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES` build setting defined in `Pods/Target Support Files/Pods-App/Pods-App.debug.xcconfig'. This can lead to problems with the CocoaPods installation
                                                    #     - Use the `$(inherited)` flag, or
                                                    #     - Remove the build settings from the target.
                                                    # [!] The `App [Release]` target overrides the `ALWAYS_EMBED_SWIFT_STANDARD_LIBRARIES` build setting defined in `Pods/Target Support Files/Pods-App/Pods-App.release.xcconfig'. This can lead to problems with the CocoaPods installation
                                                    #     - Use the `$(inherited)` flag, or
                                                    #     - Remove the build settings from the target.
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 18, 18, 17]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 18, 18, 18]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Try to sync again",
                                                    # this worked
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 18, 18, 18]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 18, 18, 3]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Point it to your mac's IP address",
                                                    children=[
                                                        Task(
                                                            "Find you IP address using `ifconfig` and looking for `inet` in `en0`",
                                                            events=[
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        18,
                                                                        3,
                                                                    ]
                                                                ),
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        18,
                                                                        24,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                        Task(
                                                            "Update the `basePath` in `frontend/src/api.ts`",
                                                            events=[
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        18,
                                                                        24,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "build `frontend`",
                                                    children=[
                                                        Task(
                                                            "npm run build; npx cap sync ios",
                                                            # worked
                                                            # don't need to run `npm install` because there are no new dependencies
                                                            # `npx cap sync ios` takes all copied builds and moves them to the xcoded project
                                                            events=[
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        18,
                                                                        24,
                                                                    ]
                                                                ),
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        18,
                                                                        26,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                        Task(
                                                            "Press the read from disk button in Xcode",
                                                            # you need to do this every time you run `npx cap sync ios`
                                                            # this might not always pop up
                                                            events=[
                                                                TaskEventStart(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        18,
                                                                        26,
                                                                    ]
                                                                ),
                                                                TaskEventComplete(
                                                                    [
                                                                        2023,
                                                                        11,
                                                                        18,
                                                                        18,
                                                                        28,
                                                                    ]
                                                                ),
                                                            ],
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Run the backend server",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 18, 18, 28]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 18, 18, 30]
                                                        ),
                                                    ],
                                                ),
                                                Task(
                                                    "Run the app on your phone again",
                                                    events=[
                                                        TaskEventStart(
                                                            [2023, 11, 18, 18, 30]
                                                        ),
                                                        TaskEventComplete(
                                                            [2023, 11, 18, 18, 32]
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
                            "Run the app on a server",
                            children=[
                                Task(
                                    "Pick a server",
                                ),
                            ],
                        ),
                    ],
                ),
            ],
        ),
        Task(
            "V1 - Users and Authentication",
        ),
        Task(
            "V2 - More Fields",
            children=[
                Task(
                    "Add `category` field to `goals`",
                    children=[
                        Task("Models"),
                        Task(
                            "Database",
                            events=[
                                TaskEventStart([2023, 11, 18, 21, 5]),
                                TaskEventPause([2023, 11, 18, 21, 22]),
                            ],
                        ),
                        Task("API"),
                    ],
                ),
                Task(
                    "Add `description` field to `records`",
                    children=[
                        Task("Models"),
                        Task("Database"),
                        Task("API"),
                    ],
                ),
            ],
        ),
        Task(
            "VL-1 - Offline",
            children=[
                Task(
                    "Keep an offline journal of requests",
                ),
                Task(
                    "Keep an offline cache of the db",
                ),
            ],
        ),
        Task(
            "VL - Cleanup",
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
            main_task,
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
