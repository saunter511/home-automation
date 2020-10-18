from datetime import datetime
from typing import Optional

from django.contrib.auth.models import (
    AbstractBaseUser,
    Group,
    PermissionsMixin,
)
from django.core.mail import send_mail
from django.db import models

from .managers import UserManager


# Custom user model
class User(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()

    # Fields
    email = models.EmailField(
        "email address", db_index=True, unique=True, error_messages={"unique": "User with this email already exists."},
    )

    birth_date = models.DateField("birth date", null=True, blank=True)

    first_name = models.CharField("first name", max_length=150, blank=True)
    last_name = models.CharField("last name", max_length=150, blank=True)

    is_active = models.BooleanField(
        "active", default=True, help_text="Designates if this user should be treated as active."
    )

    # Configuration
    EMAIL_FIELDS = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    # Methods
    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        return self.is_superuser

    def get_age(self) -> Optional[int]:
        """
        Return users age in years

        :return: age or None
        """
        if not self.birth_date:
            return None

        delta = datetime.now().date() - self.birth_date
        years = int(delta.days / 365.25)

        return years

    def get_full_name(self):
        """
        Return first_name + last_name if they're both set, else return email.

        :returns: User full name
        """
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}".strip()
        return self.email

    def get_short_name(self):
        """
        Return the short name if set, else return email.
        :returns: User full name
        """
        if self.first_name:
            return self.first_name.strip()
        return self.email

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Send an email to the user.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)


# Proxy model made to list groups under users app
class ProxyGroup(Group):
    class Meta:
        proxy = True
        verbose_name = Group._meta.verbose_name
        verbose_name_plural = Group._meta.verbose_name_plural
