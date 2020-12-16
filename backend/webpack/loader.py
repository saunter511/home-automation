import json

import requests
from django.conf import settings
from django.core.cache import cache


def get_manifest():
    caching = hasattr(settings, "WEBPACK_MANIFEST_CACHE") and settings.WEBPACK_MANIFEST_CACHE

    cached_manifest = cache.get("webpack_manifest")
    if caching and cached_manifest:
        return cached_manifest

    if hasattr(settings, "WEBPACK_MANIFEST_URL"):
        manifest = requests.get(settings.WEBPACK_MANIFEST_URL).json()

    elif hasattr(settings, "WEBPACK_MANIFEST_PATH"):
        with open(settings.WEBPACK_MANIFEST_PATH) as f:
            manifest = json.loads(f.read())
    else:
        raise Exception("Couldn't fetch manifest")

    if caching:
        cache.set("webpack_manifest", manifest)

    return manifest


def is_quoted_string(string):
    if len(string) < 2:
        return False
    return string[0] == string[-1] and string[0] in ('"', "'")


def get_path(string, context):
    if is_quoted_string(string):
        return string[1:-1]
    return context.get(string, "")
