import logging

import paho.mqtt.client as mqtt
from django.conf import settings

from .signals import mqtt_publish, mqtt_receive

logger = logging.getLogger(__name__)

client = mqtt.Client()

if not settings.TEST_MODE:
    client.connect(settings.MQTT_BROKER_URL, settings.MQTT_BROKER_PORT, 60)


def on_connect(client, userdata, flags, rc):
    """
    MQTT on connect callback

    :param client: mqtt client instance
    :param userdata: user data passed when creating a client
    :param flags: flags dictionary
    :param rc: return code
    """

    if rc == 0:
        client.subscribe(f"{settings.MQTT_TOPIC}/#")
        logger.info("Successfully connected to MQTT broker")
    else:
        logger.error("Connection to MQTT broker failed")


def on_disconnect(client, userdata, rc):
    """
    MQTT on disconnect callback

    :param client: mqtt client instance
    :param userdata: user data passed when creating a client
    :param rc: return code
    """
    logger.info("MQTT Disconnected")


def on_message(client, userdata, msg):
    """
    Receive mqtt message callback

    :param client: mqtt client instance
    :param userdata: user data passed when creating a client
    :param msg: message object
    """
    mqtt_receive.send(__name__, topic=msg.topic, payload=msg.payload.decode())


def on_publish(sender, topic, payload, **kwargs):
    """
    Publish signal callback, push a message to mqtt with passed topic and payload

    :param sender: signal sender
    :param topic: message topic
    :param payload: message payload
    """
    client.publish(topic=f"{settings.MQTT_TOPIC}/{topic}", payload=payload)


client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message
mqtt_publish.connect(on_publish)
