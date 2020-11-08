import logging

from django.db import models

from apps.home.models import Appliance

logger = logging.getLogger(__name__)


class Roller(Appliance):
    open = models.BooleanField("open", default=False)

    class Meta:
        verbose_name = "Roller"
        verbose_name_plural = "Rollers"

    def __str__(self):
        return f"<Roller {self.mqtt_topic}>"

    def mqtt_message(self, topic, payload):
        """
        Handle the mqtt message passed from the room
        """
        if payload.lower() not in ("opened", "closed"):
            return

        if payload.lower() == "opened":
            self.open = True
        elif payload.lower() == "closed":
            self.open = False

        logger.info(f"Roller {self.mqtt_topic} is now {payload.lower()}")
        self.save()
