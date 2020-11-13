import graphene
from graphene_subscriptions.events import UPDATED

from ..models import TempSensor
from .types import TempSensor as TempSensorType


class TempSensorUpdated(graphene.ObjectType):
    temp_sensor = graphene.Field(TempSensorType)

    def resolve_temp_sensor(root, info):
        return root.filter(
            lambda event: event.operation == UPDATED and isinstance(event.instance, TempSensor)
        ).map(lambda event: event.instance)
