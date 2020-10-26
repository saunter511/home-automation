from django.conf import settings
from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of username.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a regular user

        :param email: New user email
        :param password: New user password
        :param extra_fields: Other fields

        :returns: new user instance
        """

        if not email:
            raise ValueError("The Email must be set")

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)  # type: ignore
        user.save()

        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a superuser

        :param email: New user email
        :param password: New user password
        :param extra_fields: Other fields

        :returns: new user instance
        """
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

    def send_email_to_everyone(self, subject, message, from_addr=settings.DEFAULT_FROM_EMAIL):
        """
        Send an email to all users
        :param subject: Message subject
        :param message: Message content
        :param from_addr: Sender email address, DEFAULT_FROM_EMAIL in settings by default
        """
        users = self.model.objects.all()

        for user in users:
            user.send_email(subject, message, from_addr)
