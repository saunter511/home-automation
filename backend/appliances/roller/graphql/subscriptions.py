import graphene
from graphene_subscriptions.events import UPDATED

from ..models import Roller
from .types import Roller as RollerType


class RollerSubscription(graphene.ObjectType):
    roller = graphene.Field(RollerType)

    def resolve_roller(root, info):
        return root.filter(
            lambda event: event.operation == UPDATED and isinstance(event.instance, Roller)
        ).map(lambda event: event.instance)
