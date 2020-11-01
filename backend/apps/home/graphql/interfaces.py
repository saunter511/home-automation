import graphene
from graphene_django import DjangoObjectType

from ..models import Room


class InterfaceRoomType(DjangoObjectType):
    class Meta:
        model = Room


class ApplianceInterface(graphene.Interface):
    name = graphene.String()
    appliance_id = graphene.ID()
    room = graphene.Field(InterfaceRoomType)
