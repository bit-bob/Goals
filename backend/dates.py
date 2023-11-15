from datetime import datetime, timezone


def datetime_now() -> datetime:
    return datetime.now(timezone.utc)


def get_timezone_aware_date(date: datetime) -> datetime:
    return date.replace(tzinfo=timezone.utc)
