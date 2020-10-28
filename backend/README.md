# Home automation backend
![Backend](https://github.com/owocowe-piatki/home-automation/workflows/Backend/badge.svg)

## Development


### MQTT broker
You will need to start a MQTT Broker to run the server.  

If you don't need it for your work, you can either
- disable it by commenting out `apps.mqtt` in INSTALLED_APPS  
- provide an existing broker address with MQTT_BROKER_URL and MQTT_BROKER_PORT environment variables

Starting a simple mqtt broker in a docker container  

```sh
docker run -it -p 1883:1883 eclipse-mosquitto  # interactively
docker run -d -p 1883:1883 --name mqtt eclipse-mosquitto  # as a daemon
```

### Project setup
```sh
poetry install  # create a virtualenv and install dependencies
poetry shell  # start a shell within the virtualenv
./manage.py migrate  # run project db migrations
./manage.py createsuperuser  # create a superuser
```

### Run the development server
```sh
poetry run server
```


## Testing
`test.sh` script is used to run tests in the github actions workflow.  
Before pushing changes you should check if the tests pass by running it while in the correct virtualenv.
```sh
poetry shell  # start a shell within the virtualenv
./test.sh
```

If you want to run one of the tests, add it as an argument
```sh
./test.sh flake8  # python linter
./test.sh isort  # python import sorter
./test.sh unittests  # django unit tests

# if your code doesn't pass isort, you can run
./test.sh isort --apply
```

## Appliance GraphQL queries
After adding an appliance with graphql module, you should add query, mutation, type and model fields to graphql module `__init__.py`. They will be automatically loaded.

Appliance Query and Mutation fields will be merged into the root of the schema.

Fetching all appliances can be done with a type destructuring query, like so
```graphql
query Appliances {
  appliances {
    __typename  # this will be the appliance type name
    ... on Lamp {  # this follows the Lamp type declared in appliances.lamp
      id
      name
      applianceId
      room {
        name
      }
      state
    }
  }
}