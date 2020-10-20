from django.db import models

from apps.home.models import Appliance


class Lamp(Appliance):
    state = models.BooleanField("state", default=False)

    class Meta:
        verbose_name = "Lamp"
        verbose_name_plural = "Lamps"

    def __str__(self):
        return f"<Lamp {self.mqtt_topic}>"

    @property
    def mqtt_topic(self):
        return f"{self.room.mqtt_topic}/lamps/{self.appliance_id}"
