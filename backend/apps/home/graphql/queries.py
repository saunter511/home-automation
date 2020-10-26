import graphene

from ..models import Room
from .types import RoomType


class RoomQuery(graphene.ObjectType):
    rooms = graphene.List(RoomType)

    def resolve_rooms(self, info):
        return Room.objects.all()


class HomeQuery(RoomQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=HomeQuery)
