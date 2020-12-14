import logging

from django.db import models

from apps.home.models import Appliance

logger = logging.getLogger(__name__)


class Window(Appliance):
    state = models.BooleanField("state", default=False)

    class Meta:
        verbose_name = "Window"
        verbose_name_plural = "Windows"

    def __str__(self):
        return f"<Window {self.mqtt_topic}>"

    def mqtt_message(self, topic, payload):
        """
        Handle the mqtt message passed from the room
        """
        payload = payload.lower().strip()

        if payload not in ["opened", "closed", "1", "0", "true", "false"]:
            return

        self.state = payload in ["opened", "1", "true"]

        self.save()

        logger.info(f"Window {self.mqtt_topic}: {self.state}")
