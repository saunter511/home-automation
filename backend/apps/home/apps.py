from django.apps import AppConfig

from apps.mqtt.signals import mqtt_appliance_receive, mqtt_server_receive


class HomeConfig(AppConfig):
    name = "apps.home"

    def ready(self):
        from .signals import mqtt_appliance_callback, mqtt_server_callback

        # connect the mqtt receive signal to callback in signals.py
        mqtt_appliance_receive.connect(mqtt_appliance_callback)
        mqtt_server_receive.connect(mqtt_server_callback)
