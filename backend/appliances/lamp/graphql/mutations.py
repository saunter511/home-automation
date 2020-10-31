import graphene

from apps.mqtt.signals import mqtt_publish

from ..models import Lamp


class ToggleLamp(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()
    new_state = graphene.Boolean()

    def mutate(root, info, id):
        lamp = Lamp.objects.get(id=id)

        mqtt_publish.send(__name__, topic=lamp.mqtt_topic, payload=not lamp.state)
        return ToggleLamp(ok=True, new_state=not lamp.state)


class SetLamp(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        state = graphene.Boolean()

    ok = graphene.Boolean()
    new_state = graphene.Boolean()

    def mutate(root, info, id, state):
        lamp = Lamp.objects.get(id=id)

        mqtt_publish.send(__name__, topic=lamp.mqtt_topic, payload=state)
        return SetLamp(ok=True, new_state=state)


class BatchSetLamp(graphene.Mutation):
    class Arguments:
        id_list = graphene.List(graphene.ID)
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id_list, state):
        lamps = Lamp.objects.filter(id__in=id_list)

        for lamp in lamps:
            mqtt_publish.send(__name__, topic=lamp.mqtt_topic, payload=state)

        return BatchSetLamp(ok=True)
