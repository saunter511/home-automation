#!/bin/sh
BASE_DIR=$(dirname $0)

# create api docker image
docker build $BASE_DIR -t home-automation -t docker.mrim.pl/home-automation
