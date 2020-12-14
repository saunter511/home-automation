from graphene_django import DjangoObjectType

from apps.home.graphql.interfaces import ApplianceInterface

from ..models import Window as WindowModel


class Window(DjangoObjectType):
    class Meta:
        model = WindowModel
        interfaces = (ApplianceInterface,)
