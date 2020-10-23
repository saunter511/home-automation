from django.conf import settings
from django.db import models
from polymorphic.models import PolymorphicModel


class Room(models.Model):
    """
    Represents a room in the house
    Organizes appliances by grouping them, depending in which room it is
    """

    name = models.CharField(verbose_name="Name", max_length=50)
    code_name = models.SlugField(verbose_name="Code name", unique=True)
    floor = models.SmallIntegerField(verbose_name="Floor")

    class Meta:
        verbose_name = "Room"
        verbose_name_plural = "Rooms"

    def __str__(self):
        return f"{self.name} <{self.mqtt_topic}>"

    @property
    def mqtt_topic(self):
        return f"{settings.MQTT_TOPIC}/{self.code_name}"

    def mqtt_message(self, topic, payload):
        """
        Handle mqtt message to the room
        """
        appliance = self.appliances.get(  # type: ignore
            polymorphic_ctype__model=topic[0], appliance_id=topic[1]
        )

        # pass the message to appliance
        appliance.mqtt_message(topic[2:], payload)


class Appliance(PolymorphicModel):
    """
    Represents a generic appliance, it has a many-to-one relation to Room
    Name is the display name, while appliance_id is the unique identifier in the scope
    of a room and the appliance type.

    This model should NEVER be used directly for creating appliances.
    It can be used to query for all kinds of appliances.
    It's available as 'appliances' on :model:`Room`.
    """

    name = models.CharField(verbose_name="Name", max_length=50)
    appliance_id = models.PositiveSmallIntegerField(verbose_name="Appliance ID")
    room = models.ForeignKey(
        Room, verbose_name="Room", related_name="appliances", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ("room", "polymorphic_ctype", "appliance_id")

    @property
    def mqtt_topic(self):
        return (
            f"{self.room.mqtt_topic}/{self.polymorphic_ctype.model}/{self.appliance_id}"
        )
