FROM python:3.8-slim
ENV PYTHONUNBUFFERED 1

RUN pip install poetry uvicorn psycopg2-binary

RUN mkdir -p /app
WORKDIR /app

COPY pyproject.toml poetry.lock /app/
RUN poetry export -f requirements.txt -o requirements.txt
RUN pip install -r requirements.txt

COPY . /app/

# Copy frontend files to static
COPY --from=home-automation-frontend /app/dist/ /app/static/frontend/
COPY --from=home-automation-frontend /app/webpack-stats.json /app/webpack-stats.json

# CMD ["uvicorn", "--host=0.0.0.0", "--port=8000", "--no-access-log", "core.asgi:application"]
CMD ["./entrypoint.sh"]
