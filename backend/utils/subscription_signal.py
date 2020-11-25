import json

from django.core.serializers import serialize
from graphene_subscriptions.events import CREATED, UPDATED, ModelSubscriptionEvent
from rest_framework.serializers import ModelSerializer


class CustomModelSubscriptionEvent(ModelSubscriptionEvent):
    def to_dict(self):
        _dict = super(ModelSubscriptionEvent, self).to_dict()

        class EventSerializer(ModelSerializer):
            class Meta:
                model = None
                fields = "__all__"

        EventSerializer.Meta.model = self.instance
        serializer = EventSerializer(instance=self.instance)

        instance_json = json.loads(serialize("json", [self.instance], fields="__all__"))
        instance_json[0]["fields"] = dict(serializer.to_representation(self.instance))

        _dict["instance"] = json.dumps(instance_json)
        return _dict


def post_save_subscription(sender, instance, created, **kwargs):
    event = CustomModelSubscriptionEvent(
        operation=CREATED if created else UPDATED, instance=instance
    )
    event.send()
