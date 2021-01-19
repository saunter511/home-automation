from django.db import models


class Todo(models.Model):
  description = models.TextField()
  completed = models.BooleanField(default=False)
  timestamp = models.DateTimeField("timestamp", auto_now=False, auto_now_add=True)

  def _str_(self):
    return self.title