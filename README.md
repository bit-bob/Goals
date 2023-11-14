# Tasks

## Initial Setup

## Python Env Setup

```sh
make venv
source .venv/bin/activate
```

> **_NOTE:_** `source .venv/bin/activate` can't go in the makefile because source is a shell built-in command, not an executable that you can start from anywhere but a shell
> see https://superuser.com/questions/1758394/makefile-with-source-command-not-working

## Installing Requirements

### First Time Installation
```sh
brew install openapi-generator
brew install node
cd frontend
npm install
```

### After every clean
manually create /api-client/package.json and copy this into it for now, this will be automated later
```json
{
  "name": "api-client",
  "version": "0.0.0",
  "main": "./index.ts",
  "types": "./index.ts",
  "license": "MIT",
  "devDependencies": {
    "tsconfig": "*"
  }
}
```
```sh
npm install ../api-client
```

### Regular Installation
```
make install
```

## Running the app

```
make run
npm start
```

## Using the app

[Local App](http://localhost:3000/)

## Using the API

[Local API Access](http://localhost:3000/docs)

## Running the tests

```
make test
```

## Cleaning and Generating the code

```
make clean
```
