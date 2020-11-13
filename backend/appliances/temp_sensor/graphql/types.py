from graphene_django import DjangoObjectType

from apps.home.graphql.interfaces import ApplianceInterface

from ..models import TempSensor as TempSensorModel


class TempSensor(DjangoObjectType):
    class Meta:
        model = TempSensorModel
        interfaces = (ApplianceInterface,)
