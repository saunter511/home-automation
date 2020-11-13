import logging

from django.db import models

from apps.home.models import Appliance

logger = logging.getLogger(__name__)


class TempSensor(Appliance):
    last_read = models.FloatField("last_read", null=True)

    class Meta:
        verbose_name = "Temperature Sensor"
        verbose_name_plural = "Temperature sensors"

    def __str__(self):
        return f"<TempSensor {self.mqtt_topic}>"

    def mqtt_message(self, topic, payload):
        self.last_read = payload
        self.save()
        return
