import graphene
from django.db.models import Q

from ..models import Appliance, Room
from .appliance_type import APPLIANCES, ApplianceUnionType
from .room_type import RoomType


class RoomQuery(graphene.ObjectType):
    """
    Query for all room instances
    """

    rooms = graphene.List(RoomType)

    def resolve_rooms(self, info):
        return Room.objects.all()


class ApplianceQuery(graphene.ObjectType):
    """
    Query all appliance instances with a possibility of filtering by appliance or its room name
    """

    appliances = graphene.List(ApplianceUnionType, search_query=graphene.String())

    def resolve_appliances(self, info, search_query=None):
        if search_query:
            filter = Q(name__icontains=search_query) | Q(room__name__icontains=search_query)
            appliances = Appliance.objects.filter(filter)
        else:
            appliances = Appliance.objects.all()

        # Only return the graphql-enabled appliances
        return [app for app in appliances if type(app) in APPLIANCES.keys()]


class HomeQuery(ApplianceQuery, RoomQuery, graphene.ObjectType):
    pass


schema = graphene.Schema(query=HomeQuery)
