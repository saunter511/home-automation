import os

from django.apps import AppConfig
from django.db.models.signals import post_delete, post_save
from graphene_subscriptions.signals import post_delete_subscription, post_save_subscription


class TodoConfig(AppConfig):
    name = "apps.todo"

    def ready(self):
        if not os.environ.get("RUN_MAIN") and not os.environ.get("RUN_WSGI"):
            return

        from .models import Todo

        post_save.connect(post_save_subscription, sender=Todo, dispatch_uid="todo_post_save")

        post_delete.connect(post_delete_subscription, sender=Todo, dispatch_uid="todo_post_delete")
