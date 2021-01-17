import graphene
from django_fsm import can_proceed

from ..models import Lamp


class ToggleLamp(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()

    def mutate(root, info, id):
        lamp = Lamp.objects.get(id=id)

        if can_proceed(lamp.on):
            lamp.on()
        elif can_proceed(lamp.off):
            lamp.off()
        else:
            return ToggleLamp(ok=False)

        lamp.save()

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

        if state:
            lamp.on()
        else:
            lamp.off()

        lamp.save()

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
                if state:
                    lamp.on()
                else:
                    lamp.off()
                lamp.save()

        return BatchSetLamp(ok=True)
