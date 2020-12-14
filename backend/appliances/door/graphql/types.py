from graphene_django import DjangoObjectType

from apps.home.graphql.interfaces import ApplianceInterface

from ..models import Door as DoorModel


class Door(DjangoObjectType):
    class Meta:
        model = DoorModel
        interfaces = (ApplianceInterface,)
