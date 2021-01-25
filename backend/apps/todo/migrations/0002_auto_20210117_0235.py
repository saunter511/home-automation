# Generated by Django 3.1.4 on 2021-01-17 01:35

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='todo',
            name='title',
        ),
        migrations.AddField(
            model_name='todo',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='timestamp'),
            preserve_default=False,
        ),
    ]
