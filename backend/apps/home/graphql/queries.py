import graphene

from ..models import Appliance, Room
from .appliance_type import ApplianceUnionType
from .room_type import RoomType


class RoomQuery(graphene.ObjectType):
    rooms = graphene.List(RoomType)

    def resolve_rooms(self, info):
        return Room.objects.all()


class ApplianceQuery(graphene.ObjectType):
    appliances = graphene.List(ApplianceUnionType)

    def resolve_appliances(self, info):
        return Appliance.objects.all()


class HomeQuery(ApplianceQuery, RoomQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=HomeQuery)
