import logging

from django.apps import AppConfig
from django.conf import settings

from .client import client

logger = logging.getLogger(__name__)


class MqttConfig(AppConfig):
    name = "apps.mqtt"
    verbose_name = "MQTT handler"

    def ready(self):
        if not settings.TEST_MODE:
            client.loop_stop()
            client.loop_start()
