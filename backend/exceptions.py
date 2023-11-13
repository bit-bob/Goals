class ResourceNotFoundException(Exception):
    def __init__(self, message="Resource not found"):
        self.message = message
        super().__init__(self.message)

    def __str__(self):
        return f"ResourceNotFoundException: {self.message}"
