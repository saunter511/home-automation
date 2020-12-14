from django.contrib import admin

from apps.home.admin import ApplianceChildAdmin, ApplianceParentAdmin

from .models import Window

ApplianceParentAdmin.child_models.append(Window)


@admin.register(Window)
class WindowAdmin(ApplianceChildAdmin):
    base_model = Window

    def get_exclude(self, request, obj):
        if obj:
            return ()
        return ("state",)

    def get_readonly_fields(self, request, obj):
        if obj:
            return ("state",)
        else:
            return ()
