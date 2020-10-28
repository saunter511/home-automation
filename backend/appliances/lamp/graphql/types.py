from graphene_django import DjangoObjectType

from apps.home.graphql.interfaces import ApplianceInterface

from ..models import Lamp as LampModel


class Lamp(DjangoObjectType):
    class Meta:
        model = LampModel
        interfaces = (ApplianceInterface,)
