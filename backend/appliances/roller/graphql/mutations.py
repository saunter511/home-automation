import graphene
from django_fsm import can_proceed

from ..models import Roller


class ToggleRoller(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    ok = graphene.Boolean()

    def mutate(root, info, id):
        roller = Roller.objects.get(id=id)

        if can_proceed(roller.open):
            roller.open()
        elif can_proceed(roller.close):
            roller.close()
        else:
            return ToggleRoller(ok=False)

        roller.save()
        return ToggleRoller(ok=True)


class SetRoller(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id, state):
        roller = Roller.objects.get(id=id)

        if not can_proceed(roller.open if state else roller.close):
            return SetRoller(ok=False)

        if state:
            roller.open()
        else:
            roller.close()

        roller.save()
        return SetRoller(ok=True)


class BatchSetRoller(graphene.Mutation):
    class Arguments:
        id_list = graphene.List(graphene.ID)
        state = graphene.Boolean()

    ok = graphene.Boolean()

    def mutate(root, info, id_list, state):
        rollers = Roller.objects.filter(id__in=id_list)

        for roller in rollers:
            if can_proceed(roller.open if state else roller.close):
                if state:
                    roller.open()
                else:
                    roller.close()
                roller.save()

        return BatchSetRoller(ok=True)
