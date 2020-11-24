# Generated by Django 3.1.3 on 2020-11-10 10:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("home", "0002_auto_20201022_2356"),
    ]

    operations = [
        migrations.CreateModel(
            name="TempSensor",
            fields=[
                (
                    "appliance_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        primary_key=True,
                        serialize=False,
                        to="home.appliance",
                    ),
                ),
                ("last_read", models.FloatField(null=True, verbose_name="last_read")),
            ],
            options={
                "verbose_name": "Temperature Sensor",
                "verbose_name_plural": "Temperature sensors",
            },
            bases=("home.appliance",),
        ),
    ]