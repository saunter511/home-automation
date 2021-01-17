import os

from django.apps import AppConfig

from .client import start_client
from .signals import mqtt_appliance_publish, mqtt_server_publish


class MqttConfig(AppConfig):
    name = "apps.mqtt"
    verbose_name = "MQTT handler"

    def ready(self):
        # Skip if running in the main thread
        if not os.environ.get("RUN_MAIN") and not os.environ.get("RUN_WSGI"):
            return

        client = start_client()
        if client:
            mqtt_appliance_publish.connect(client.publish_appliance_signal)
            mqtt_server_publish.connect(client.publish_server_signal)
            client.loop_start()
