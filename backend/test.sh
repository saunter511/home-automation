#!/bin/sh
BASE_DIR=$(dirname $0)

run_flake8() {
    printf "\nRunning flake8\n"
    poetry run flake8 . --max-line-length=100 --extend-exclude "migrations"
}

run_isort() {
    printf "\nRunning isort\n"
    if [ -n "$1" ]; then
        poetry run isort . "$@"
    else
        poetry run isort . --check-only
    fi
}

run_black() {
    printf "\nFixing with black\n"
    poetry run black .
}

run_unittests() {
    printf "\nRunning unittests\n"
    poetry run python manage.py test
}

case "$1" in
    "flake8")
        shift
        run_flake8 "$@"
        ;;
    "isort")
        shift
        run_isort "$@"
        ;;
    "unittests")
        shift
        run_unittests "$@"
        ;;
    "fix")
        shift
        run_isort --interactive
        run_black
        ;;
    "")
        run_flake8
        run_isort
        run_unittests
        ;;
    *)
        echo "Unknown command '$1'"
esac
