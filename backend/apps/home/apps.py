from django.apps import AppConfig

from apps.mqtt.signals import mqtt_receive


class HomeConfig(AppConfig):
    name = "apps.home"

    def ready(self):
        from .signals import mqtt_callback

        # connect the mqtt receive signal to callback in signals.py
        mqtt_receive.connect(mqtt_callback)
