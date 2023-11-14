import argparse
import json

from app import app
from fastapi.openapi.utils import get_openapi

parser = argparse.ArgumentParser(description="Open api spec generator")
parser.add_argument("out", type=str, help="Location to output openapi json spec.")
args = parser.parse_args()

with open(args.out, "w") as f:
    json.dump(
        get_openapi(
            title=app.title,
            version=app.version,
            openapi_version=app.openapi_version,
            description=app.description,
            routes=app.routes,
        ),
        f,
    )
