from datetime import datetime

import graphene

from ..models import User
from .types import PublicUserType, UserType


class UserQuery(graphene.ObjectType):
    current_user = graphene.Field(UserType)
    birthdays_this_month = graphene.List(PublicUserType)

    def resolve_current_user(self, info):
        return info.context.user

    def resolve_birthdays_this_month(self, info):
        return User.objects.filter(
            birth_date__month=datetime.now().month,
            birth_date__day__gte=datetime.now().day,
        )
