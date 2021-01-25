from django.db import models


class Todo(models.Model):
    description = models.TextField("description")
    completed = models.BooleanField(default=False)
    timestamp = models.DateTimeField("timestamp", auto_now=False, auto_now_add=True)


class Meta:
    verbose_name = "Todo"
    verbose_name_plural = "Todos"

    def _str_(self):
        return self.description
