import graphene
from graphene_django import DjangoObjectType

from ..models import Room
from .appliance_type import APPLIANCES, ApplianceUnionType


class RoomType(DjangoObjectType):
    appliances = graphene.List(ApplianceUnionType)

    class Meta:
        model = Room

    def resolve_appliances(self, info):
        appliances = self.appliances.all()

        # Only return the graphql-enabled appliances
        return [app for app in appliances if type(app) in APPLIANCES.keys()]
