import graphene
from graphene_subscriptions.events import UPDATED

from ..models import Door
from .types import Door as DoorType


class DoorStateChanged(graphene.ObjectType):
    door = graphene.Field(DoorType)

    def resolve_door(root, info):
        return root.filter(
            lambda event: event.operation == UPDATED and isinstance(event.instance, Door)
        ).map(lambda event: event.instance)
