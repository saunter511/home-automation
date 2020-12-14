import os

import graphene
from django.db.models.signals import post_save

from utils.subscription_signal import post_save_subscription

from ..models import Window as WindowModel
from .subscriptions import WindowStateChanged
from .types import Window as WindowType

if os.environ.get("RUN_MAIN") or os.environ.get("RUN_WSGI"):
    post_save.connect(post_save_subscription, sender=WindowModel, dispatch_uid="window_post_save")

type = WindowType
model = WindowModel


class Query(graphene.ObjectType):
    windows = graphene.List(WindowType)

    def resolve_windows(self, info, **kwargs):
        return WindowModel.objects.all()


class Subscription(WindowStateChanged, graphene.ObjectType):
    pass
