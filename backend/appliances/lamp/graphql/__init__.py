import graphene

from ..models import Lamp as LampModel
from .types import Lamp as LampType

type = LampType
model = LampModel


class Query(graphene.ObjectType):
    lamps = graphene.List(LampType)

    def resolve_lamps(self, info, **kwargs):
        return LampModel.objects.all()


class Mutation(graphene.ObjectType):
    pass
