#!/bin/sh
BASE_DIR=$(dirname $0)

run_flake8() {
    printf "\nRunning flake8\n"
    flake8 . --max-line-length=120 --extend-exclude "migrations"
    echo " Passed"
}

run_isort() {
    printf "\nRunning isort\n"
    if [ -n "$1" ]; then
        isort . -m 3 --trailing-comma "$@"
    else
        isort . -m 3 --trailing-comma --check-only
    fi
    echo " Passed"
}

run_unittests() {
    printf "\nRunning unittests\n"
    python manage.py test
    echo " Passed"
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
    "")
        run_flake8
        run_isort
        run_unittests
        printf "\nTests passed\n"
        ;;
    *)
        echo "Unknown command '$1'"
esac
