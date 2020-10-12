# Home automation project
This repo is a part of an "Agile software development" class at University of Economics in Katowice.

The project is about building a hub connecting multiple IoT devices in a smart home.
It will consit of a mqtt broker, connected to a central hub subscribing and publishing to some dummy devices (possible to replace with real ones). It will provide REST and GraphQL APIs.

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