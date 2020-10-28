import os

from django.apps import AppConfig

from .client import start_client


class MqttConfig(AppConfig):
    name = "apps.mqtt"
    verbose_name = "MQTT handler"

    def ready(self):
        # Skip if running in the main thread
        if not os.environ.get("RUN_MAIN") and not os.environ.get("RUN_WSGI"):
            return

        client = start_client()
        if client:
            client.loop_start()
