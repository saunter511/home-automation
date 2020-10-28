import graphene

from .room_type import RoomType


class ApplianceInterface(graphene.Interface):
    name = graphene.String()
    appliance_id = graphene.ID()
    room = graphene.Field(RoomType)
