#!/bin/bash

celery -A core.celery worker --beat -l INFO --scheduler django_celery_beat.schedulers:DatabaseScheduler

