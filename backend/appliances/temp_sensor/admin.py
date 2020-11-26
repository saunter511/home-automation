from django.contrib import admin

from apps.home.admin import ApplianceChildAdmin, ApplianceParentAdmin

from .models import TempSensor

ApplianceParentAdmin.child_models.append(TempSensor)


@admin.register(TempSensor)
class TempSensorAdmin(ApplianceChildAdmin):
    base_model = TempSensor

    def get_exclude(self, request, obj):
        if obj:
            return ()
        return ("last_read", "last_read_time")

    def get_readonly_fields(self, request, obj):
        if obj:
            return ("last_read", "last_read_time")
        return ()
