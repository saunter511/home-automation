import graphene
from django_fsm import can_proceed

from apps.mqtt.signals import mqtt_publish

from ..models import Socket


class ToggleSocket(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()

    def mutate(root, info, id):
        socket = Socket.objects.get(id=id)

        if can_proceed(socket.on):
            payload = "on"
        elif can_proceed(socket.off):
            payload = "off"
        else:
            return ToggleSocket(ok=False)

        mqtt_publish.send(__name__, topic=socket.mqtt_topic, payload=payload)
        return ToggleSocket(ok=True, new_state=not socket.state)


class SetSocket(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id, state):
        socket = Socket.objects.get(id=id)

        if not can_proceed(socket.on if state else socket.off):
            return SetSocket(ok=False)

        mqtt_publish.send(__name__, topic=socket.mqtt_topic, payload="on" if state else "off")
        return SetSocket(ok=True, new_state=state)


class BatchSetSocket(graphene.Mutation):
    class Arguments:
        id_list = graphene.List(graphene.ID)
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id_list, state):
        sockets = Socket.objects.filter(id__in=id_list)

        for socket in sockets:
            if can_proceed(socket.on if state else socket.off):
                mqtt_publish.send(
                    __name__, topic=socket.mqtt_topic, payload="on" if state else "off"
                )

        return BatchSetSocket(ok=True)
