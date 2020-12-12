import inspect

import graphene

import appliances
from apps.chat.graphql import Mutation as ChatMutation
from apps.chat.graphql import Query as ChatQuery
from apps.chat.graphql import Subscription as ChatSubscription
from apps.home.graphql.queries import HomeQuery
from apps.users.graphql.queries import UserQuery

queries = [HomeQuery, UserQuery, ChatQuery]
mutations = [ChatMutation]
subscriptions = [ChatSubscription]

# Attach all appliance queries dynamically
for appliance in inspect.getmembers(appliances, inspect.ismodule):
    if hasattr(appliance[1], "graphql"):

        # Attach queries
        if hasattr(appliance[1].graphql, "Query"):
            queries.append(appliance[1].graphql.Query)

        # Attach mutations
        if hasattr(appliance[1].graphql, "Mutation"):
            mutations.append(appliance[1].graphql.Mutation)

        # Attach subscriptions
        if hasattr(appliance[1].graphql, "Subscription"):
            subscriptions.append(appliance[1].graphql.Subscription)


class Query(*queries, graphene.ObjectType):
    pass


class Mutation(*mutations, graphene.ObjectType):
    pass


class Subscription(*subscriptions, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation, subscription=Subscription)
