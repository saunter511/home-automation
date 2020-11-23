import graphene
from django.db.models.signals import post_save
from graphene_subscriptions.signals import post_save_subscription

from ..models import Roller as RollerModel
from .mutations import BatchSetRoller, SetRoller, ToggleRoller
from .subscriptions import RollerSubscription
from .types import Roller as RollerType

post_save.connect(post_save_subscription, sender=RollerModel, dispatch_uid="roller_post_save")

type = RollerType
model = RollerModel


class Query(graphene.ObjectType):
    rollers = graphene.List(RollerType)

    def resolve_rollers(self, info, **kwargs):
        return RollerModel.objects.all()


class Mutation(graphene.ObjectType):
    set_roller = SetRoller.Field()
    toggle_roller = ToggleRoller.Field()
    batch_set_roller = BatchSetRoller.Field()


class Subscription(RollerSubscription, graphene.ObjectType):
    pass
