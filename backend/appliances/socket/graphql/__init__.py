import graphene
from django.db.models.signals import post_save

from utils.subscription_signal import post_save_subscription

from ..models import Socket as SocketModel
from .mutations import BatchSetSocket, SetSocket, ToggleSocket
from .subscriptions import SocketSwitched
from .types import Socket as SocketType

post_save.connect(post_save_subscription, sender=SocketModel, dispatch_uid="socket_post_save")

type = SocketType
model = SocketModel


class Query(graphene.ObjectType):
    sockets = graphene.List(SocketType)

    def resolve_sockets(self, info, **kwargs):
        return SocketModel.objects.all()


class Mutation(graphene.ObjectType):
    toggle_socket = ToggleSocket.Field()
    set_socket = SetSocket.Field()
    batch_set_socket = BatchSetSocket.Field()


class Subscription(SocketSwitched, graphene.ObjectType):
    pass
