from django import forms
from django.contrib.auth.forms import UserChangeForm as BaseUserChangeForm
from django.contrib.auth.forms import UserCreationForm as BaseUserCreationForm

from .models import User


class UserCreationForm(BaseUserCreationForm):
    class Meta(BaseUserCreationForm):
        model = User
        fields = ("first_name", "last_name", "email")


class UserChangeForm(BaseUserChangeForm):
    class Meta(BaseUserChangeForm):
        model = User
        fields = ("first_name", "last_name", "email")

        widgets = {
            "email": forms.EmailInput(attrs={"readonly": "readonly"}),
        }
