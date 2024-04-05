# Tasks

## Description

A simple web app for goals with burndown (or up) graphs

Tech Stack: Python, FastAPI, React, sqlite3

## Initial Setup

### Python Env Setup
```sh
make venv
source .venv/bin/activate
```

### Install Packages
```sh
make install
```

## Development

### Cleaning and generating code
```sh
make clean
```

### Running tests
```
make test
```

## Hosting
### Running the backend server
```sh
make run
```
### Running the frontend server
```sh
cd frontend
npm start
```

## Usage

### Using the web app

[http://localhost:3000/](http://localhost:3000/)

### Using the API

[http://localhost:3000/docs](http://localhost:3000/docs)
