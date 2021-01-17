import logging

from django.db import models

from apps.home.models import Appliance

logger = logging.getLogger(__name__)


class Door(Appliance):
    state = models.BooleanField("state", default=False)

    class Meta:
        verbose_name = "Door"
        verbose_name_plural = "Doord"

    def __str__(self):
        return f"<Door {self.mqtt_appliance_topic}>"

    def mqtt_server_message(self, topic, payload):
        pass

    def mqtt_appliance_message(self, topic, payload):
        """
        Handle the mqtt message passed from the room
        """
        payload = payload.lower().strip()

        if payload not in ["opened", "closed", "1", "0", "true", "false"]:
            return

        self.state = payload in ["opened", "1", "true"]

        self.save()

        logger.info(f"Door {self.mqtt_appliance_topic}: {self.state}")
