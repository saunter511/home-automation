import graphene
from django.db.models.signals import post_save

from utils.subscription_signal import post_save_subscription

from ..models import TempSensor as TempSensorModel
from .subscriptions import TempSensorUpdated
from .types import TempSensor as TempSensorType

post_save.connect(
    post_save_subscription,
    sender=TempSensorModel,
    dispatch_uid="temp_sensor_post_save",
)

type = TempSensorType
model = TempSensorModel


class Query(graphene.ObjectType):
    temp_sensors = graphene.List(TempSensorType)

    def resolve_temp_sensors(self, info, **kwargs):
        return TempSensorModel.objects.all()


class Subscription(TempSensorUpdated, graphene.ObjectType):
    pass
