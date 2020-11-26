from datetime import timedelta

import graphene
from django.utils import timezone
from graphene_django import DjangoObjectType

from apps.home.graphql.interfaces import ApplianceInterface

from ..models import TempSensor as TempSensorModel

group_time = timedelta(minutes=2)


def group_by_time(history):
    readings = iter(history)

    group = []

    try:
        reading = next(readings)
        last = reading.read_time
        group.append(reading)

        for reading in readings:

            if abs(reading.read_time - last) > group_time:
                yield group
                group = []

            group.append(reading)
            last = reading.read_time

        yield group

    except StopIteration:
        return []


class TempHistory(graphene.ObjectType):
    read_time = graphene.DateTime()
    value = graphene.Float()


class TempSensor(DjangoObjectType):
    history = graphene.List(TempHistory)

    class Meta:
        model = TempSensorModel
        interfaces = (ApplianceInterface,)

    def resolve_history(self, info):
        time_threshold = timezone.now() - timedelta(hours=12)
        sensor_history = self.history.order_by("-read_time").filter(read_time__gt=time_threshold)

        grouped = group_by_time(sensor_history)

        grouped = [
            {
                "read_time": group[-1].read_time,
                "value": sum([read.value for read in group]) / len(group),
            }
            for group in grouped
        ]

        return grouped
