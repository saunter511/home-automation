import graphene
from graphene_subscriptions.events import UPDATED

from ..models import Window
from .types import Window as WindowType


class WindowStateChanged(graphene.ObjectType):
    window = graphene.Field(WindowType)

    def resolve_window(root, info):
        return root.filter(
            lambda event: event.operation == UPDATED and isinstance(event.instance, Window)
        ).map(lambda event: event.instance)
