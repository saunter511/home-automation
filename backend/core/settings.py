"""
For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""
import os
from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Runtime security settings
DEBUG = True
SECRET_KEY = os.getenv("SECRET_KEY") or "secret"
ALLOWED_HOSTS = []

SITE_DOMAIN = os.getenv("SITE_DOMAIN") or "localhost"

# Needed for debug variable in templates (to make webpack work)
if DEBUG:
    INTERNAL_IPS = ["127.0.0.1"]

# Main url configuration file path
ROOT_URLCONF = "core.urls"

# WSGI Application entrypoint
# https://en.wikipedia.org/wiki/Web_Server_Gateway_Interface
WSGI_APPLICATION = "core.wsgi.application"

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
STATIC_ROOT = BASE_DIR / "static_files"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media_files"

# Application definitions
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.admindocs",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # libraries
    "webpack_loader",
    # internals
    "apps.users",
]


# Database - https://docs.djangoproject.com/en/3.1/ref/settings/#databases
# fmt: off
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3"
    }
}
# fmt: on

# Email settings
DEFAULT_FROM_EMAIL = f"Home <home@{SITE_DOMAIN}>"  # default server email

if DEBUG:
    # send emails to console in debug mode
    EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
else:
    # TODO: Specify email backend for deployment
    pass


# Authentication settings
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators
AUTH_USER_MODEL = "users.User"
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

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

# Webpack stats loader
if DEBUG:
    import requests
    from webpack_loader.loader import WebpackLoader

    class URLWebpackLoader(WebpackLoader):
        def load_assets(self):
            url = self.config["STATS_URL"]
            return requests.get(url).json()

    WEBPACK_LOADER = {
        "DEFAULT": {
            "CACHE": False,
            "BUNDLE_DIR_NAME": "",
            "STATS_URL": "http://localhost:5000/webpack-stats.json",
            "POLL_INTERVAL": 0.1,
            "TIMEOUT": None,
            "LOADER_CLASS": "core.settings.URLWebpackLoader",
        }
    }
else:
    WEBPACK_LOADER = {
        "DEFAULT": {
            "CACHE": True,
            "BUNDLE_DIR_NAME": "",
            "STATS_FILE": BASE_DIR / "webpack-stats.json",
            "POLL_INTERVAL": 0.1,
            "TIMEOUT": None,
            "LOADER_CLASS": "webpack_loader.loader.WebpackLoader",
        }
    }
