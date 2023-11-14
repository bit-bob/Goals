from datetime import datetime, timezone


def datetime_now() -> datetime:
    return datetime.now(timezone.utc)


def make_date_timezone_aware(date: datetime) -> None:
    date.replace(tzinfo=timezone.utc)
