from django.dispatch import Signal

mqtt_receive = Signal(["topic", "payload"])
mqtt_publish = Signal(["topic", "payload"])
