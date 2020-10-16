from django.contrib import admin
from django.contrib.auth.admin import GroupAdmin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group

from .models import ProxyGroup, User

# Make groups appear under users app in admin
admin.site.unregister(Group)
admin.site.register(ProxyGroup, GroupAdmin)


# Register user model to admin
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    model = User

    list_display = [
        "get_full_name",
        "email",
        "is_superuser",
    ]

    list_filter = ["is_superuser"]

    fieldsets = (
        ("Account details", {"fields": ("email", "password")}),
        ("User info", {"fields": ("first_name", "last_name", "birth_date")},),
        ("Permissions", {"fields": ("is_superuser", "user_permissions")}),
        ("Groups", {"fields": ("groups",)}),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "first_name", "last_name", "birth_date", "password1", "password2"),
            },
        ),
    )

    ordering = ("email",)
