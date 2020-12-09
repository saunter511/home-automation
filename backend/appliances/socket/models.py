import logging

from django_fsm import FSMField, can_proceed, transition

from apps.home.models import Appliance

logger = logging.getLogger(__name__)


class Socket(Appliance):
    state = FSMField(default="off", protected=True)

    class Meta:
        verbose_name = "Socket"
        verbose_name_plural = "Sockets"

    def __str__(self):
        return f"<Socket {self.mqtt_topic}>"

    @transition(field=state, source="off", target="requestOn")
    def on(self):
        return

    @transition(field=state, source="requestOn", target="on")
    def switchedon(self):
        return

    @transition(field=state, source="on", target="requestOff")
    def off(self):
        return

    @transition(field=state, source="requestOff", target="off")
    def switchedoff(self):
        return

    def mqtt_message(self, topic, payload):
        """
        Handle the mqtt message passed from the room
        """
        payload = payload.lower().strip()

        if payload not in ["switchedoff", "switchedon", "on", "off"]:
            return

        method = getattr(self, payload)

        if can_proceed(method):
            method()
            self.save()
            logger.info(f"Socket {self.mqtt_topic}: {self.state}")
        else:
            logger.warning(
                f"Socket {self.mqtt_topic}: '{payload}' impossible, current state is {self.state}"
            )
