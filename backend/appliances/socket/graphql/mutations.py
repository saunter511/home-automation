import graphene

from apps.mqtt.signals import mqtt_publish

from ..models import Socket


class ToggleSocket(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()
    new_state = graphene.Boolean()

    def mutate(root, info, id):
        socket = Socket.objects.get(id=id)

        mqtt_publish.send(__name__, topic=socket.mqtt_topic, payload=not socket.state)
        return ToggleSocket(ok=True, new_state=not socket.state)


class SetSocket(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        state = graphene.Boolean()

    ok = graphene.Boolean()
    new_state = graphene.Boolean()

    def mutate(root, info, id, state):
        socket = Socket.objects.get(id=id)

        mqtt_publish.send(__name__, topic=socket.mqtt_topic, payload=state)
        return SetSocket(ok=True, new_state=state)


class BatchSetSocket(graphene.Mutation):
    class Arguments:
        id_list = graphene.List(graphene.ID)
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id_list, state):
        sockets = Socket.objects.filter(id__in=id_list)

        for socket in sockets:
            mqtt_publish.send(__name__, topic=socket.mqtt_topic, payload=state)

        return BatchSetSocket(ok=True)
