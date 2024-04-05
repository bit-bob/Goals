from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute

from routers import goals, records

# App
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: Configurable
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Add the routers to the app
app.include_router(goals.router)
app.include_router(records.router)


def use_route_names_as_operation_ids(app: FastAPI):
    for route in app.routes:
        if isinstance(route, APIRoute):
            route.operation_id = route.name


use_route_names_as_operation_ids(app)
