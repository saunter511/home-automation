FROM node:14-alpine

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY ./package.json yarn.lock /app/
RUN yarn install --silent

# Copy app files and build
COPY . /app/
RUN yarn build