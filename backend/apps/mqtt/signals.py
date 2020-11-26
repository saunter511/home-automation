from django.dispatch import Signal

# Both require 'topic' and 'payload'
mqtt_receive = Signal()
mqtt_publish = Signal()
