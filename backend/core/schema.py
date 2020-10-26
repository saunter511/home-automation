import graphene

from apps.home.graphql.queries import HomeQuery
from apps.users.graphql.queries import UserQuery


class Query(HomeQuery, UserQuery, graphene.ObjectType):
    hello = graphene.String(default_value="Hi!")


schema = graphene.Schema(query=Query)
