from fastapi import HTTPException
from functools import wraps
import sys
import traceback


class ResourceNotFoundException(Exception):
    def __init__(self, message="Resource not found"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f"ResourceNotFoundException: {self.message}"


def handle_http_exceptions(f):
    @wraps(f)
    async def decorated(*args, **kwargs):
        try:
            return await f(*args, **kwargs)

        except ResourceNotFoundException as error:
            raise HTTPException(status_code=404, detail=str(error))

        except Exception as error:
            # TODO: Create an exception metric for tracing
            print("Exception type", type(error).__name__)
            print("An exception occurred:", error)
            traceback.print_exception(*sys.exc_info())
            raise HTTPException(status_code=500, detail="Unexpected error")

    return decorated
