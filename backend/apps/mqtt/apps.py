import logging
import os

from django.apps import AppConfig

from .client import start_client

logger = logging.getLogger(__name__)


class MqttConfig(AppConfig):
    name = "apps.mqtt"
    verbose_name = "MQTT handler"

    def ready(self):
        # Skip if running in the main thread
        if not os.environ.get("RUN_MAIN"):
            return

        client = start_client()
        if client:
            client.loop_start()
