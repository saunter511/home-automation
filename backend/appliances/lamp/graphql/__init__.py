import os

import graphene
from django.db.models.signals import post_save

from utils.subscription_signal import post_save_subscription

from ..models import Lamp as LampModel
from .mutations import BatchSetLamp, SetLamp, ToggleLamp
from .subscriptions import LampSwitched
from .types import Lamp as LampType

if os.environ.get("RUN_MAIN") or os.environ.get("RUN_WSGI"):
    post_save.connect(post_save_subscription, sender=LampModel, dispatch_uid="lamp_post_save")

type = LampType
model = LampModel


class Query(graphene.ObjectType):
    lamps = graphene.List(LampType)

    def resolve_lamps(self, info, **kwargs):
        return LampModel.objects.all()


class Mutation(graphene.ObjectType):
    toggle_lamp = ToggleLamp.Field()
    set_lamp = SetLamp.Field()
    batch_set_lamp = BatchSetLamp.Field()


class Subscription(LampSwitched, graphene.ObjectType):
    pass
