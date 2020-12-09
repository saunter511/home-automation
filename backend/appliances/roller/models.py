import logging

from django_fsm import FSMField, can_proceed, transition

from apps.home.models import Appliance

logger = logging.getLogger(__name__)


class Roller(Appliance):
    state = FSMField(default="closed", protected=True)

    class Meta:
        verbose_name = "Roller"
        verbose_name_plural = "Rollers"

    def __str__(self):
        return f"<Roller {self.mqtt_topic}>"

    @transition(field=state, source="closed", target="requestOpen")
    def open(self):
        return

    @transition(field=state, source="requestOpen", target="opened")
    def opened(self):
        return

    @transition(field=state, source="opened", target="requestClose")
    def close(self):
        return

    @transition(field=state, source="requestClose", target="closed")
    def closed(self):
        return

    def mqtt_message(self, topic, payload):
        """
        Handle the mqtt message passed from the room
        """
        payload = payload.lower().strip()

        if payload not in ("opened", "closed", "open", "close"):
            return

        method = getattr(self, payload)

        if can_proceed(method):
            method()
            self.save()
            logger.info(f"Roller {self.mqtt_topic}: {self.state}")
        else:
            logger.warning(
                f"Roller {self.mqtt_topic} can't '{payload}', current state is {self.state}"
            )
