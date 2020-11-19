import logging

from django.db import models

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

    class Meta:
        verbose_name = "Temperature Sensor"
        verbose_name_plural = "Temperature sensors"

    def __str__(self):
        return f"<TempSensor {self.mqtt_topic}>"

    def save_reading(self, new_temp):
        self.last_read = new_temp
        self.save()

        TempHistory.objects.create(value=new_temp, sensor=self)
        logger.info(f"Temperature sensor {self.mqtt_topic} got a new reading: {new_temp}°C")

    def mqtt_message(self, topic, payload):
        """
        Handle a mqtt message to temperature sensor
        Parse payload as float, compare to the previous value and save if different
        """

        try:
            new_temp = round(float(payload), 1)
        except Exception:
            logger.warning(f"'{payload}' is an invalid temperature value!")
            return

        if new_temp != self.last_read:
            self.save_reading(new_temp)
