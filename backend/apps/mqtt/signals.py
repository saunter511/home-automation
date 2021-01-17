from django.dispatch import Signal

# All require 'topic' and 'payload'
mqtt_appliance_receive = Signal()
mqtt_appliance_publish = Signal()
mqtt_server_receive = Signal()
mqtt_server_publish = Signal()
