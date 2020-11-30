from graphene_django import DjangoObjectType

from apps.home.graphql.interfaces import ApplianceInterface

from ..models import Socket as SocketModel


class Socket(DjangoObjectType):
    class Meta:
        model = SocketModel
        interfaces = (ApplianceInterface,)
