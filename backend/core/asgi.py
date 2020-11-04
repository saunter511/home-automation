"""
ASGI config for core project.
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""
import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from graphene_subscriptions.consumers import GraphqlSubscriptionConsumer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings")


# fmt: off
application = ProtocolTypeRouter({
    # "http": get_asgi_application(),
    "websocket": URLRouter([
        path("graphql/", GraphqlSubscriptionConsumer)]
    )
})
# fmt: on
