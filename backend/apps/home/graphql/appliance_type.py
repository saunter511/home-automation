import importlib
import logging

import graphene
from django.conf import settings

logger = logging.getLogger(__name__)

APPLIANCES = {}

# Import all appliance graphql modules and create a mapping between models and types
for app in settings.INSTALLED_APPS:
    if app.startswith("appliances"):
        try:
            module = importlib.import_module(f"{app}.graphql")  # type: ignore
            APPLIANCES[module.model] = module.type  # type: ignore
            logger.info(f"Loaded appliance {app}")
        except Exception as e:
            logger.error(f"Couldn't import graphql module from appliance {app}: {e}")


class ApplianceUnionType(graphene.Union):
    @classmethod
    def resolve_type(cls, instance, info):
        instance_type = type(instance)

        if instance_type in APPLIANCES.keys():
            return APPLIANCES[instance_type]

        return None

    class Meta:
        types = list(APPLIANCES.values())
