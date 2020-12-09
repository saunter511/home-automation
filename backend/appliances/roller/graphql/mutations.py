import graphene
from django_fsm import can_proceed

from apps.mqtt.signals import mqtt_publish

from ..models import Roller


class ToggleRoller(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()

    def mutate(root, info, id):
        roller = Roller.objects.get(id=id)

        if can_proceed(roller.open):
            payload = "open"
        elif can_proceed(roller.close):
            payload = "close"
        else:
            return ToggleRoller(ok=False)

        mqtt_publish.send(__name__, topic=roller.mqtt_topic, payload=payload)
        return ToggleRoller(ok=True)


class SetRoller(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id, state):
        roller = Roller.objects.get(id=id)

        payload = "open" if state else "close"

        if not can_proceed(roller.open if state else roller.close):
            return SetRoller(ok=False)

        mqtt_publish.send(__name__, topic=roller.mqtt_topic, payload=payload)
        return SetRoller(ok=True)


class BatchSetRoller(graphene.Mutation):
    class Arguments:
        id_list = graphene.List(graphene.ID)
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id_list, state):
        rollers = Roller.objects.filter(id__in=id_list)

        payload = "open" if state else "close"

        for roller in rollers:
            if can_proceed(roller.open if state else roller.close):
                mqtt_publish.send(__name__, topic=roller.mqtt_topic, payload=payload)

        return BatchSetRoller(ok=True)
