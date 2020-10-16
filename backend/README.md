# Backend

`test.sh` script is used to run tests in the github actions workflow.  
Before pushing changes you should check if the tests pass by running it while in the correct virtualenv.
```sh
poetry shell
./test.sh
```

If you want to run one of the tests, add it as an argument
```sh
./test.sh flake8  # python linter
./test.sh isort  # python import sorter
./test.sh unittests  # django unit tests
```