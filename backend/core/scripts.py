import subprocess


def runserver():
    cmd = ["python", "manage.py", "runserver", "0.0.0.0:8000"]
    subprocess.run(cmd)


def run_celery():
    cmd = [
        "celery",
        "-A",
        "core.celery",
        "worker",
        "--beat",
        "-l",
        "INFO",
        "--scheduler",
        "django_celery_beat.schedulers:DatabaseScheduler",
    ]
    subprocess.run(cmd)
