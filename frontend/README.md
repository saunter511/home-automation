# Home automation frontend
![Frontend](https://github.com/owocowe-piatki/home-automation/workflows/Frontend/badge.svg)

## Development

### Project setup
1. Go to frontend directory
2. Run `yarn install`

### Run the development server
1. The backend should be up and running
2. Run `yarn dev` to start the development server
3. Then go to `localhost:8000` to see the website.


### Testing
You can run the test suite based on jest with
```sh
yarn test
```

### Linting
Github actions runs linters on both js and styled-components css

To run them yourself, run
```sh
yarn lint:js  # for eslint
yarn lint:css  # for styled-components
yarn prettier  # for prettier code formatter check

# if your code doesn't pass prettier check, you can run
yarn prettier:fix
```

### Pre-push testing
Above test can be performed locally with
```sh
yarn test:all
```