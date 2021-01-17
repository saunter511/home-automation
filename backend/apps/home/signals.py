import logging

from .models import Room

logger = logging.getLogger(__name__)


def mqtt_server_callback(sender, signal, topic, payload, **kwargs):
    """
    Process incoming server mqtt message and pass it to proper room
    """
    try:
        room = Room.objects.get(code_name=topic[0])
    except Exception:
        logger.warning(f"No room with codename {topic[0]}")
        return

    room.mqtt_server_message(topic[1:], payload)


def mqtt_appliance_callback(sender, signal, topic, payload, **kwargs):
    """
    Process incoming appliance mqtt message and pass it to proper room
    """

    try:
        room = Room.objects.get(code_name=topic[0])
    except Exception:
        logger.warning(f"No room with codename {topic[0]}")
        return

    room.mqtt_appliance_message(topic[1:], payload)
