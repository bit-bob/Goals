venv:
	if [ ! -d "$(DIR1)" ]; then \
		python3 -m venv .venv; \
	fi

freeze:
	.venv/bin/pip freeze > requirements.txt

install:
	.venv/bin/pip install -r requirements.txt

openapi:
	.venv/bin/python backend/gen_openapi.py openapi.json
	openapi-generator generate -i ./openapi.json -g typescript-fetch -o ./api_client

pretty:
	.venv/bin/black backend

test:
	.venv/bin/pytest

clean: openapi pretty test

run:
	.venv/bin/python backend/main.py

todo:
	.venv/bin/python todo.py
