#!/bin/sh
python manage.py collectstatic --noinput
uvicorn --host=0.0.0.0 --port=8000 --no-access-log core.asgi:application