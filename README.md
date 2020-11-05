# Home automation project
![Frontend](https://github.com/owocowe-piatki/home-automation/workflows/Frontend/badge.svg)
![Backend](https://github.com/owocowe-piatki/home-automation/workflows/Backend/badge.svg)

This repo is a part of an "Agile software development" class at University of Economics in Katowice.

The project is about building a hub connecting multiple IoT devices in a smart home.
It will consit of a mqtt broker, connected to a central hub subscribing and publishing to some dummy devices (possible to replace with real ones). It will provide REST and GraphQL APIs.

## Development
For more info about how to work on the project, go to respective project directories and check their READMEs.

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
    git remote add upstream git@github.com:owocowe-piatki/home-automation.git
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


### To create a pull request, follow the requirements

##### Pull request title

Pull request has to follow the "HA-{Jira issue number}:" syntax
For hotfixes "HOTFIX:" prefix is allowed

The regex is as follows

```
   (HA-\d+|HOTFIX):
```

##### Pull request comment

Pull request comment should follow this pull request template

```
This code block should be replaced with a commit message submitted
during squash and merge.
```
