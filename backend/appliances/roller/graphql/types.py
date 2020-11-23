from graphene_django import DjangoObjectType

from apps.home.graphql.interfaces import ApplianceInterface

from ..models import Roller as RollerModel


class Roller(DjangoObjectType):
    class Meta:
        model = RollerModel
        interfaces = (ApplianceInterface,)
