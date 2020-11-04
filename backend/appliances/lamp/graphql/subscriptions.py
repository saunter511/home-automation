import graphene
from graphene_subscriptions.events import UPDATED

from ..models import Lamp
from .types import Lamp as LampType


class LampSwitched(graphene.ObjectType):
    lamp = graphene.Field(LampType)

    def resolve_lamp(root, info):
        return root.filter(
            lambda event: event.operation == UPDATED and isinstance(event.instance, Lamp)
        ).map(lambda event: event.instance)
