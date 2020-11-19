import graphene
from graphene_django import DjangoObjectType

from apps.home.graphql.interfaces import ApplianceInterface

from ..models import TempHistory as TempHistoryModel
from ..models import TempSensor as TempSensorModel


class TempHistory(DjangoObjectType):
    class Meta:
        model = TempHistoryModel


class TempSensor(DjangoObjectType):
    history = graphene.List(TempHistory)

    class Meta:
        model = TempSensorModel
        interfaces = (ApplianceInterface,)

    def resolve_history(self, info):
        return self.history.all()
