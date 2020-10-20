from django.contrib import admin

from apps.home.admin import ApplianceChildAdmin, ApplianceParentAdmin

from .models import Lamp

ApplianceParentAdmin.child_models.append(Lamp)


@admin.register(Lamp)
class LampAdmin(ApplianceChildAdmin):
    base_model = Lamp

    readonly_fields = ("state",)

    def get_exclude(self, request, obj):
        if obj:
            return []
        return ["state"]
