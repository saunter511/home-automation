import graphene
from graphene_django import DjangoObjectType

from ..models import Room
from .appliance_type import ApplianceUnionType


class RoomType(DjangoObjectType):
    appliances = graphene.List(ApplianceUnionType)

    class Meta:
        model = Room

    def resolve_appliances(self, info):
        return self.appliances.all()  # type: ignore
