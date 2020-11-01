import graphene
from django.contrib.auth.models import Group, Permission
from graphene_django import DjangoObjectType

from ..models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        exclude = ["password"]

    full_name = graphene.String()
    short_name = graphene.String()

    def resolve_full_name(self, info):
        return self.get_full_name()

    def resolve_short_name(self, info):
        return self.get_short_name()


class PublicUserType(UserType):
    class Meta:
        model = User
        fields = ["birth_date"]


class GroupType(DjangoObjectType):
    class Meta:
        model = Group


class PermissionType(DjangoObjectType):
    class Meta:
        model = Permission
