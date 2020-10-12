#!/bin/sh
BASE_DIR=$(dirname $0)

# create frontend docker image
docker build $BASE_DIR/frontend -t home-automation-frontend

# create backend docker image
docker build $BASE_DIR/backend -t home-automation-backend
