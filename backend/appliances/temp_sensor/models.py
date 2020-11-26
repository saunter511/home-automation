import logging
from datetime import timedelta

from django.db import models
from django.utils import timezone

from apps.home.models import Appliance

logger = logging.getLogger(__name__)


class TempHistory(models.Model):
    value = models.FloatField("temperature value")
    read_time = models.DateTimeField("read time", auto_now_add=True)
    sensor = models.ForeignKey("TempSensor", related_name="history", on_delete=models.CASCADE)

    class Meta:
        verbose_name = "Temperature Reading"
        verbose_name_plural = "Temperature Readings"

    def __str__(self):
        return f"{self.sensor} - {self.value}°C"


class TempSensor(Appliance):
    last_read = models.FloatField("last read", null=True)
    last_read_time = models.DateTimeField("last read time", null=True)

    temp_tolerance = models.FloatField("change tolerance", default=0.25)

    class Meta:
        verbose_name = "Temperature Sensor"
        verbose_name_plural = "Temperature sensors"

    def __str__(self):
        return f"<TempSensor {self.mqtt_topic}>"

    def save_reading(self, new_temp):
        self.last_read = new_temp
        self.last_read_time = timezone.now()
        self.save()

        TempHistory.objects.create(value=new_temp, sensor=self)
        logger.info(f"Temperature sensor {self.mqtt_topic} got a new reading: {new_temp}°C")

    def mqtt_message(self, topic, payload):
        """
        Handle a mqtt message to temperature sensor
        Parse payload as float, compare to the previous value and save if:
        1. last_read is null
        2. the temperature is offset by at least temp_tolerace
        3. last read was over an hour ago
        """

        try:
            new_temp = float(payload)
        except Exception:
            logger.warning(f"'{payload}' is an invalid temperature value!")
            return

        if (
            not self.last_read
            or (abs(new_temp - self.last_read) > self.temp_tolerance)
            or self.last_read_time < timezone.now() - timedelta(hours=1)
        ):
            self.save_reading(new_temp)
