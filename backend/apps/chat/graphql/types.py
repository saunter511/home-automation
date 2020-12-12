from graphene_django import DjangoObjectType

from ..models import ChatMessage


class ChatMessageType(DjangoObjectType):
    class Meta:
        model = ChatMessage
