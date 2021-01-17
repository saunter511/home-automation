import graphene
from django_fsm import can_proceed

from ..models import Socket


class ToggleSocket(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()

    def mutate(root, info, id):
        socket = Socket.objects.get(id=id)

        if can_proceed(socket.on):
            socket.on()
        elif can_proceed(socket.off):
            socket.off()
        else:
            return ToggleSocket(ok=False)

        socket.save()
        return ToggleSocket(ok=True)


class SetSocket(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id, state):
        socket = Socket.objects.get(id=id)

        if not can_proceed(socket.on if state else socket.off):
            return SetSocket(ok=False)

        if state:
            socket.on()
        else:
            socket.off()
        socket.save()

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
                if state:
                    socket.on()
                else:
                    socket.off()
                socket.save()

        return BatchSetSocket(ok=True)
