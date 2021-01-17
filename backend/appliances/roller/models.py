import logging

from django_fsm import RETURN_VALUE, FSMField, can_proceed, transition

from apps.home.models import Appliance
from apps.mqtt.signals import mqtt_appliance_publish

logger = logging.getLogger(__name__)


class Roller(Appliance):
    SERVER_MESSAGES = ["open", "close"]
    APPLIANCE_MESSAGES = ["opened", "closed"]

    state = FSMField(default="closed", protected=True)

    class Meta:
        verbose_name = "Roller"
        verbose_name_plural = "Rollers"

    def __str__(self):
        return f"<Roller {self.mqtt_appliance_topic}>"

    @transition(field=state, source="closed", target="request-open")
    def open(self):
        mqtt_appliance_publish.send(
            __name__, topic=self.mqtt_appliance_topic, payload="request-open"
        )

    @transition(field=state, source="opened", target="request-close")
    def close(self):
        mqtt_appliance_publish.send(
            __name__, topic=self.mqtt_appliance_topic, payload="request-close"
        )

    @transition(field=state, source="request-open", target="opened")
    def opened(self):
        return

    @transition(field=state, source="request-close", target="closed")
    def closed(self):
        return

    @transition(
        field=state,
        source=["opened", "closed"],
        target=RETURN_VALUE("request-open", "request-close"),
    )
    def toggle(self):
        new_state = "request-open" if self.state == "off" else "request-close"
        mqtt_appliance_publish.send(__name__, topic=self.mqtt_appliance_topic, payload=new_state)
        return new_state

    @transition(
        field=state,
        source=["request-open", "request-close"],
        target=RETURN_VALUE("opened", "closed"),
    )
    def reset(self):
        new_state = "opened" if self.state == "request-close" else "closed"
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
            logger.info(f"Roller {self.mqtt_appliance_topic}: {self.state}")
        else:
            logger.warning(
                f"Roller {self.mqtt_appliance_topic} can't "
                f"'{payload}', current state is {self.state}"
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
