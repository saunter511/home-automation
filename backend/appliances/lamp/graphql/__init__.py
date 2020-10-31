import graphene

from ..models import Lamp as LampModel
from .mutations import BatchSetLamp, SetLamp, ToggleLamp
from .types import Lamp as LampType

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
