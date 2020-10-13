# Home automation project
This repo is a part of an "Agile software development" class at University of Economics in Katowice.

The project is about building a hub connecting multiple IoT devices in a smart home.
It will consit of a mqtt broker, connected to a central hub subscribing and publishing to some dummy devices (possible to replace with real ones). It will provide REST and GraphQL APIs.

## Development
### Backend
1. Go to backend directory
2. Run `poetry install` and switch to the virtualenv `poetry shell`
3. Apply migrations `./manage.py migrate`
4. Create superuser `./manage.py createsuperuser`
5. Start the development server `poetry run server`

### Frontend
1. Go to frontend directory
2. Run `yarn install`
3. Run `yarn dev` to start the development server

Then go to `localhost:8000` to see the website.

## Deployment
To build a docker image run:
```
docker build . -t <your tag>
```

## Git workflow

### Prepare your fork
1. Fork this repository to your own github account.
2. Clone your fork to you computer
3. Add this repository as upstream
   ```sh
    git remote add upstream git@github.com:rimmaciej/home-automation
   ```

### To update your fork to the most recent one, run (in your main branch):
```sh
git pull --rebase upstream main

git push # to sync with your fork on github
```

### To work on a feature, create a feature branch
```sh
git checkout main # switch to main branch

# update to the latest version, look at the point above

git checkout -b <your feature branch name>
```

After you finish your work, go to github and create a pull request from your fork to the main repository
