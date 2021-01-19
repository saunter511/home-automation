"""
For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
import os
from pathlib import Path

from .logging import ColoredFormatter

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Runtime security settings
DEBUG = bool(int(os.getenv("DEBUG", True)))
SECRET_KEY = os.getenv("SECRET_KEY", "secret")
ALLOWED_HOSTS = ["*"] if DEBUG else os.getenv("ALLOWED_HOSTS").split(",")

SITE_DOMAIN = os.getenv("SITE_DOMAIN", "localhost")

# Needed for debug variable in templates (to make webpack work)
if DEBUG:
    INTERNAL_IPS = ["127.0.0.1"]

# Main url configuration file path
ROOT_URLCONF = "core.urls"

# WSGI and ASGI Application entrypoint
# https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface
WSGI_APPLICATION = "core.wsgi.application"
ASGI_APPLICATION = "core.routing.application"

# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/
LANGUAGE_CODE = "en-us"
TIME_ZONE = "Europe/Warsaw"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Static and media files
# https://docs.djangoproject.com/en/3.1/howto/static-files/
STATIC_URL = "/static/"
MEDIA_URL = "/media/"

STATICFILES_DIRS = (BASE_DIR / "static",)
STATIC_ROOT = os.getenv("STATIC_ROOT", BASE_DIR / "static_files")
MEDIA_ROOT = os.getenv("MEDIA_ROOT", BASE_DIR / "media_files")

# MQTT Config
MQTT_URL = os.getenv("MQTT_HOST", "localhost")
MQTT_PORT = os.getenv("MQTT_PORT", 1883)
MQTT_USERNAME = os.getenv("MQTT_USERNAME", None)
MQTT_PASSWORD = os.getenv("MQTT_PASSWORD", None)
MQTT_TOPIC = os.getenv("MQTT_ROOT_TOPIC", "home")

# Application definitions
INSTALLED_APPS = [
    # internals
    "django.contrib.admin",
    "django.contrib.admindocs",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # libraries
    "polymorphic",
    "channels",
    "rest_framework.authtoken",
    "rest_framework",
    "graphene_django",
    "graphene_subscriptions",
    "django_celery_beat",
    "django_celery_results",
    "django_filters",
    # modules
    "webpack",
    "apps.users",
    "apps.home",
    "apps.chat",
    "apps.todo",
    "appliances.lamp",
    "appliances.roller",
    "appliances.temp_sensor",
    "appliances.socket",
    "appliances.window",
    "appliances.door",
    "apps.mqtt",  # has to be last
]

# Database - https://docs.djangoproject.com/en/3.1/ref/settings/#databases
# fmt: off
DB_TYPE = os.getenv("DB_BACKEND", 'sqlite')

if DB_TYPE == 'postgres':
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": os.getenv("DB_NAME", 'home-automation'),
            "USER": os.getenv("DB_USER"),
            "PASSWORD": os.getenv("DB_PASSWORD"),
            "HOST": os.getenv("DB_HOST"),
            "PORT": os.getenv("DB_PORT", "5432")
        }
    }
elif DB_TYPE == 'sqlite':
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3"
        }
    }
else:
    raise Exception("No database backend specified")
# fmt: on

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
    "DEFAULT_PARSER_CLASSES": ("rest_framework.parsers.JSONParser",),
    "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
}

GRAPHENE = {"SCHEMA": "core.schema.schema"}

# Channels config
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer",
    }
}

# Email settings
DEFAULT_FROM_EMAIL = f"Home <home@{SITE_DOMAIN}>"  # default server email
EMAIL_BACKEND = os.getenv("EMAIL_BACKEND", "console")

if EMAIL_BACKEND == "console":
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
elif EMAIL_BACKEND == "postfix":
    EMAIL_HOST = os.getenv("EMAIL_BACKEND_HOST")

# Authentication settings
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators
AUTH_USER_MODEL = "users.User"
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# Logging - https://docs.djangoproject.com/en/3.0/topics/logging/
LOG_LEVEL = os.getenv("LOG_LEVEL", "DEBUG" if DEBUG else "INFO")

app_logger = {
    "handlers": ["console"],
    "level": LOG_LEVEL,
    "propagate": False,
}

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {"colored": {"()": ColoredFormatter}},
    "handlers": {
        "console": {"level": "DEBUG", "class": "logging.StreamHandler", "formatter": "colored"},
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "WARNING",
            "propagate": False,
        },
        "daphne": {
            "handlers": ["console"],
            "level": "WARNING",
            "propagate": False,
        },
        "apps": app_logger,
        "appliances": app_logger,
        "": {
            "handlers": ["console"],
            "level": "INFO" if DEBUG else "WARNING",
            "propagate": True,
        },
    },
}

# User after/before authentication config

LOGIN_REDIRECT_URL = "/"
LOGIN_URL = "/users/login"
LOGOUT_REDIRECT_URL = "/users/login"

# Middlewares - https://docs.djangoproject.com/en/3.0/topics/http/middleware/
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

# Template loader config
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

CACHE_TYPE = os.getenv("CACHE_TYPE", "locmem")
REDIS_URL = (
    "redis://"
    f"{os.getenv('REDIS_HOST', 'localhost')}"
    f":{os.getenv('REDIS_PORT', 6379)}"
    f"/{os.getenv('REDIS_DB_NUMBER', 1)}/"
)

# Celery config
CELERY_TIMEZONE = TIME_ZONE
CELERY_TASK_TRACK_STARTED = True
CELERY_TASK_TIME_LIMIT = 30 * 60
CELERY_CACHE_BACKEND = "default"
CELERY_RESULT_BACKEND = "django-db"
CELERY_BROKER_URL = REDIS_URL  # Celery will not work unless redis is running

# Cache config
# fmt: off
if CACHE_TYPE == "locmem":
    CACHES = {
        "default": {
            "BACKEND": "django.core.cache.backends.locmem.LocMemCache"
        }
    }
elif CACHE_TYPE == "redis":
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": REDIS_URL,
            "OPTIONS": {"CLIENT_CLASS": "django_redis.client.DefaultClient"},
            "KEY_PREFIX": "cache",
        }
    }
else:
    raise Exception("No cache backend specified")
# fmt: on

# Webpack manifest config
if os.getenv("RUN_MAIN"):
    WEBPACK_MANIFEST_URL = "http://localhost:5000/static/webpack-manifest.json"
    WEBPACK_MANIFEST_CACHE = False
else:
    WEBPACK_MANIFEST_PATH = BASE_DIR / STATIC_ROOT / "webpack-manifest.json"
    WEBPACK_MANIFEST_CACHE = True
