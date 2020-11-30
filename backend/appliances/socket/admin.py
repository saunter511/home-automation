from django.contrib import admin

from apps.home.admin import ApplianceChildAdmin, ApplianceParentAdmin

from .models import Socket

ApplianceParentAdmin.child_models.append(Socket)


@admin.register(Socket)
class SocketAdmin(ApplianceChildAdmin):
    base_model = Socket

    def get_exclude(self, request, obj):
        if obj:
            return ()
        return ("state",)

    def get_readonly_fields(self, request, obj):
        if obj:
            return ("state",)
        else:
            return ()
