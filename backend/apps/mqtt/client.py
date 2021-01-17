import logging

import paho.mqtt.client as mqtt
from django.conf import settings

from .signals import mqtt_appliance_receive, mqtt_server_receive

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
            client.subscribe(f"{settings.MQTT_TOPIC}/server/#")
            client.subscribe(f"{settings.MQTT_TOPIC}/appliance/#")

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
        logger.warning(f"MQTT Broker disconnected [{rc}]")

    def on_message(client, userdata, msg):
        """
        Receive mqtt message callback

        :param client: mqtt client instance
        :param userdata: user data passed when creating a client
        :param msg: message object
        """

        topic = msg.topic
        payload = msg.payload.decode()
        logger.debug(f"Received message '{payload}' on topic '{topic}'")

        topic = [part for part in topic.split("/") if part]
        topic_type = topic[1]

        if topic_type.lower() == "appliance":
            mqtt_appliance_receive.send(__name__, topic=topic[2:], payload=payload)
        elif topic_type.lower() == "server":
            mqtt_server_receive.send(__name__, topic=topic[2:], payload=payload)
        else:
            logger.debug(f"Unknown topic type '{topic_type}'")

    def publish_appliance_signal(sender, topic, payload, **kwargs):
        """
        Publish signal callback, push a message to mqtt with passed topic and payload

        :param sender: signal sender
        :param topic: message topic
        :param payload: message payload
        """
        logger.debug(f"Publishing appliance message '{payload}' on topic '{topic}'")
        client.publish(topic=topic, payload=payload)

    def publish_server_signal(sender, topic, payload, **kwargs):
        """
        Publish signal callback, push a message to mqtt with passed topic and payload

        :param sender: signal sender
        :param topic: message topic
        :param payload: message payload
        """
        logger.debug(f"Publishing server message '{payload}' on topic '{topic}'")
        client.publish(topic=topic, payload=payload)

    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.on_message = on_message
    client.publish_appliance_signal = publish_appliance_signal
    client.publish_server_signal = publish_server_signal

    try:
        client.connect(settings.MQTT_URL, int(settings.MQTT_PORT), 60)
        return client

    except Exception as e:
        logger.critical(f"Failed to connect to broker: {e}")
        return None
