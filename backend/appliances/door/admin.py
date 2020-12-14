from django.contrib import admin

from apps.home.admin import ApplianceChildAdmin, ApplianceParentAdmin

from .models import Door

ApplianceParentAdmin.child_models.append(Door)


@admin.register(Door)
class DoorAdmin(ApplianceChildAdmin):
    base_model = Door

    def get_exclude(self, request, obj):
        if obj:
            return ()
        return ("state",)

    def get_readonly_fields(self, request, obj):
        if obj:
            return ("state",)
        else:
            return ()
