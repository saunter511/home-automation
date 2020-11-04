# Frontend build stage
FROM node:14-alpine as frontend

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install dependencies
COPY frontend/package.json frontend/yarn.lock /app/
RUN yarn install

# Copy app files and build
COPY frontend/ /app/
RUN yarn build


# Main stage - build backend image and copy frontend static files into it
FROM python:3.8-slim
ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install gcc -y && apt-get clean

RUN pip install poetry psycopg2-binary

RUN mkdir -p /app
WORKDIR /app

COPY backend/pyproject.toml backend/poetry.lock /app/
RUN poetry export -f requirements.txt -o requirements.txt
RUN pip install -r requirements.txt

COPY backend/ /app/

# Copy frontend files to static
COPY --from=frontend /app/dist/ /app/static/frontend/
COPY --from=frontend /app/webpack-stats.json /app/webpack-stats.json

CMD ["./entrypoint.sh"]
