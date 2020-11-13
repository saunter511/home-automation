import logging

from django.db import models

from apps.home.models import Appliance

logger = logging.getLogger(__name__)


class Lamp(Appliance):
    state = models.BooleanField("state", default=False)

    class Meta:
        verbose_name = "Lamp"
        verbose_name_plural = "Lamps"

    def __str__(self):
        return f"<Lamp {self.mqtt_topic}>"

    def mqtt_message(self, topic, payload):
        """
        Handle the mqtt message passed from the room
        """
        is_toggle = payload.lower() in ("toggle", "switch")
        is_on = payload.lower() in ("true", "1", "on")
        is_off = payload.lower() in ("false", "0", "off")

        if (self.state and is_off) or (not self.state and is_on) or is_toggle:
            self.state = not self.state
            self.save()
            logger.info(f"Lamp {self.mqtt_topic} switched {'on' if self.state else 'off'}")
            return
