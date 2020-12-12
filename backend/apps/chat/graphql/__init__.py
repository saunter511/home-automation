import graphene
from graphene_subscriptions.events import CREATED

from ..models import ChatMessage
from .types import ChatMessageType


class Query(graphene.ObjectType):
    chat_messages = graphene.List(ChatMessageType)

    def resolve_chat_messages(self, info, **kwargs):
        return ChatMessage.objects.order_by("-timestamp")[:100][::-1]


class Subscription(graphene.ObjectType):
    chat_message_sent = graphene.Field(ChatMessageType)

    def resolve_chat_message_sent(root, info):
        def handler(ev):
            return ev.operation == CREATED and isinstance(ev.instance, ChatMessage)

        return root.filter(handler).map(lambda event: event.instance)


class SendMessage(graphene.Mutation):
    class Arguments:
        message = graphene.String()

    ok = graphene.Boolean()

    def mutate(root, info, message):
        msg = ChatMessage(content=message, author=info.context.user)
        msg.save()

        return SendMessage(ok=True)


class Mutation(graphene.ObjectType):
    send_chat_message = SendMessage.Field()
