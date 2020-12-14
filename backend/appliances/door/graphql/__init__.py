import os

import graphene
from django.db.models.signals import post_save

from utils.subscription_signal import post_save_subscription

from ..models import Door as DoorModel
from .subscriptions import DoorStateChanged
from .types import Door as DoorType

if os.environ.get("RUN_MAIN") or os.environ.get("RUN_WSGI"):
    post_save.connect(post_save_subscription, sender=DoorModel, dispatch_uid="door_post_save")

type = DoorType
model = DoorModel


class Query(graphene.ObjectType):
    doors = graphene.List(DoorType)

    def resolve_doors(self, info, **kwargs):
        return DoorModel.objects.all()


class Subscription(DoorStateChanged, graphene.ObjectType):
    pass
