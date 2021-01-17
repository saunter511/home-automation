import logging

from django_fsm import RETURN_VALUE, FSMField, can_proceed, transition

from apps.home.models import Appliance
from apps.mqtt.signals import mqtt_appliance_publish

logger = logging.getLogger(__name__)


class Lamp(Appliance):
    SERVER_MESSAGES = ["on", "off", "toggle", "reset"]
    APPLIANCE_MESSAGES = ["switched-off", "switched-on"]

    state = FSMField(default="off", protected=True)

    class Meta:
        verbose_name = "Lamp"
        verbose_name_plural = "Lamps"

    def __str__(self):
        return f"<Lamp {self.mqtt_appliance_topic}>"

    @transition(field=state, source="off", target="request-on")
    def on(self):
        mqtt_appliance_publish.send(__name__, topic=self.mqtt_appliance_topic, payload="request-on")

    @transition(field=state, source="on", target="request-off")
    def off(self):
        mqtt_appliance_publish.send(
            __name__, topic=self.mqtt_appliance_topic, payload="request-off"
        )

    @transition(field=state, source="request-on", target="on")
    def switchedon(self):
        return

    @transition(field=state, source="request-off", target="off")
    def switchedoff(self):
        return

    @transition(field=state, source=["on", "off"], target=RETURN_VALUE("request-on", "request-off"))
    def toggle(self):
        new_state = "request-on" if self.state == "off" else "request-off"
        mqtt_appliance_publish.send(__name__, topic=self.mqtt_appliance_topic, payload=new_state)
        return new_state

    @transition(field=state, source=["request-on", "request-off"], target=RETURN_VALUE("on", "off"))
    def reset(self):
        new_state = "on" if self.state == "request-off" else "off"
        logger.warning(f"Resetting {self.mqtt_appliance_topic} state to '{new_state}'")

        mqtt_appliance_publish.send(
            __name__, topic=f"{self.mqtt_appliance_topic}/reset", payload=new_state
        )

        return new_state

    def handle_message(self, topic, payload):
        """
        Handle both appliance and server messages
        """
        method = getattr(self, payload.replace("-", ""))

        if can_proceed(method):
            method()
            self.save()
            logger.info(f"Lamp {self.mqtt_appliance_topic} new state: {self.state}")
        else:
            logger.warning(
                f"Lamp {self.mqtt_appliance_topic} can't '{payload}', current state is {self.state}"
            )

    def mqtt_server_message(self, topic, payload):
        """
        Handle server mqtt messages
        """
        payload = payload.lower().strip()

        if payload not in self.SERVER_MESSAGES:
            return

        self.handle_message(topic, payload)

    def mqtt_appliance_message(self, topic, payload):
        """
        Handle appliance mqtt messages
        """
        payload = payload.lower().strip()

        if payload not in self.APPLIANCE_MESSAGES:
            return

        self.handle_message(topic, payload)
