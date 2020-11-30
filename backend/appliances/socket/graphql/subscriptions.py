import graphene
from graphene_subscriptions.events import UPDATED

from ..models import Socket
from .types import Socket as SocketType


class SocketSwitched(graphene.ObjectType):
    socket = graphene.Field(SocketType)

    def resolve_socket(root, info):
        return root.filter(
            lambda event: event.operation == UPDATED and isinstance(event.instance, Socket)
        ).map(lambda event: event.instance)
