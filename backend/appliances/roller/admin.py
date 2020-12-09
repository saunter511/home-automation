from django.contrib import admin

from apps.home.admin import ApplianceChildAdmin, ApplianceParentAdmin

from .models import Roller

ApplianceParentAdmin.child_models.append(Roller)


@admin.register(Roller)
class RollerAdmin(ApplianceChildAdmin):
    base_model = Roller

    def get_exclude(self, request, obj):
        if obj:
            return ()
        return ("state",)

    def get_readonly_fields(self, request, obj):
        if obj:
            return ("state",)
        else:
            return ()
