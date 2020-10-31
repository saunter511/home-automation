import logging

import paho.mqtt.client as mqtt
from django.conf import settings

from .signals import mqtt_receive

logger = logging.getLogger(__name__)


def start_client():
    client = mqtt.Client(client_id="control-center", protocol=mqtt.MQTTv5)

    # Set username and password if at least username is specified in settings
    if settings.MQTT_USERNAME:
        client.username_pw_set(settings.MQTT_USERNAME, settings.MQTT_PASSWORD)

    def on_connect(client, userdata, flags, rc, properties):
        """
        MQTT on connect callback

        :param client: mqtt client instance
        :param userdata: user data passed when creating a client
        :param flags: flags dictionary
        :param rc: return code
        :param properties: properties
        """
        if rc == 0:
            client.subscribe(f"{settings.MQTT_TOPIC}/#")
            logger.info("Connected to MQTT broker")
        else:
            logger.error("Connection to MQTT broker failed")

    def on_disconnect(client, userdata, rc):
        """
        MQTT on disconnect callback

        :param client: mqtt client instance
        :param userdata: user data passed when creating a client
        :param rc: return code
        """
        logger.debug(f"MQTT Broker disconnected [{rc}]")

    def on_message(client, userdata, msg):
        """
        Receive mqtt message callback

        :param client: mqtt client instance
        :param userdata: user data passed when creating a client
        :param msg: message object
        """
        topic = msg.topic
        payload = msg.payload.decode()
        mqtt_receive.send(__name__, topic=topic, payload=payload)

    def signal_publish(sender, topic, payload, **kwargs):
        """
        Publish signal callback, push a message to mqtt with passed topic and payload

        :param sender: signal sender
        :param topic: message topic
        :param payload: message payload
        """
        client.publish(topic=topic, payload=payload)

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.on_message = on_message
    client.signal_publish = signal_publish

    try:
        client.connect(settings.MQTT_URL, int(settings.MQTT_PORT), 60)
        return client

    except Exception as e:
        logger.error(f"Failed to connect to broker: {e}")
        return None
