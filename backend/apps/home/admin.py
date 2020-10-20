from django.contrib import admin
from polymorphic.admin import (
    PolymorphicChildModelAdmin,
    PolymorphicChildModelFilter,
    PolymorphicParentModelAdmin,
)

from .models import Appliance, Room


class ApplianceChildAdmin(PolymorphicChildModelAdmin):
    """
    Child admin class for appliances.
    Appliance ModelAdmins should inherit from this.
    """

    pass


@admin.register(Appliance)
class ApplianceParentAdmin(PolymorphicParentModelAdmin):
    """
    Parent Admin class for appliances. This is registered and visible in admin.
    """

    child_models = []
    list_display = ("name", "get_appliance_type", "get_room_name", "mqtt_topic")
    list_filter = (PolymorphicChildModelFilter, "room__name")

    def get_appliance_type(self, obj):
        return obj.get_real_instance_class()._meta.verbose_name

    get_appliance_type.short_description = "Appliance type"

    def get_room_name(self, obj):
        return obj.room.name

    get_room_name.short_description = "Room"


class ApplianceInline(admin.TabularInline):
    """
    Displays a table with related appliances under RoomAdmin form.
    """

    model = Appliance
    can_delete = False  # disable deleting
    extra = 0  # don't show extra fields for adding

    # disable changing appliances from this view
    def has_change_permission(self, request, obj):
        return False

    # disable adding appliances from this view
    def has_add_permission(self, request, obj):
        return False


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    """
    ModelAdmin class for :model:`Room` model.
    """

    list_display = ("name", "floor", "mqtt_topic")

    inlines = [ApplianceInline]

    # only show inlines on existing instances, not when creating one
    def get_inline_instances(self, request, obj=None):
        inlines = super().get_inline_instances(request, obj)

        if obj:
            return inlines
        return []
