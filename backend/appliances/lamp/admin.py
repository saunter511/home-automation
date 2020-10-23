from django.contrib import admin

from apps.home.admin import ApplianceChildAdmin, ApplianceParentAdmin

from .models import Lamp

ApplianceParentAdmin.child_models.append(Lamp)


@admin.register(Lamp)
class LampAdmin(ApplianceChildAdmin):
    base_model = Lamp

    def get_exclude(self, request, obj):
        if obj:
            return ()
        return ("state",)

    def get_readonly_fields(self, request, obj):
        if obj:
            return ("state",)
        else:
            return ()
