import graphene
from django_fsm import can_proceed

from apps.mqtt.signals import mqtt_publish

from ..models import Lamp


class ToggleLamp(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()

    def mutate(root, info, id):
        lamp = Lamp.objects.get(id=id)

        if can_proceed(lamp.on):
            payload = "on"
        elif can_proceed(lamp.off):
            payload = "off"
        else:
            return ToggleLamp(ok=False)

        mqtt_publish.send(__name__, topic=lamp.mqtt_topic, payload=payload)
        return ToggleLamp(ok=True)


class SetLamp(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id, state):
        lamp = Lamp.objects.get(id=id)

        if not can_proceed(lamp.on if state else lamp.off):
            return SetLamp(ok=False)

        mqtt_publish.send(__name__, topic=lamp.mqtt_topic, payload="on" if state else "off")
        return SetLamp(ok=True)


class BatchSetLamp(graphene.Mutation):
    class Arguments:
        id_list = graphene.List(graphene.ID)
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id_list, state):
        lamps = Lamp.objects.filter(id__in=id_list)

        for lamp in lamps:
            if can_proceed(lamp.on if state else lamp.off):
                mqtt_publish.send(__name__, topic=lamp.mqtt_topic, payload="on" if state else "off")

        return BatchSetLamp(ok=True)
