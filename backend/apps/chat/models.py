from django.contrib.auth import get_user_model
from django.db import models


class ChatMessage(models.Model):
    content = models.TextField("content")
    author = models.ForeignKey(get_user_model(), verbose_name="author", on_delete=models.CASCADE)
    timestamp = models.DateTimeField("timestamp", auto_now=False, auto_now_add=True)

    class Meta:
        verbose_name = "ChatMessage"
        verbose_name_plural = "ChatMessages"

    def __str__(self):
        return self.content
