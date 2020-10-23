import logging

from .models import Room

logger = logging.getLogger(__name__)


def mqtt_callback(sender, signal, topic, payload, **kwargs):
    """
    Process incoming mqtt message and pass it to proper room
    """
    topic = topic.split("/")[1:]

    try:
        room = Room.objects.get(code_name=topic[0])
    except Exception:
        logger.debug(f"No room with codename {topic[0]}")
        return

    room.mqtt_message(topic[1:], payload)
