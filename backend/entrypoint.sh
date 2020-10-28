#!/bin/sh
export RUN_WSGI=true
python manage.py collectstatic --noinput
python manage.py migrate
uvicorn --host=0.0.0.0 --port=8000 --no-access-log core.asgi:application