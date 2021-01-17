import pytest
from django.conf import settings
from django.db.utils import IntegrityError
from django.test import TestCase
from polymorphic.models import PolymorphicModel

from .models import Appliance, Room


class RoomTest(TestCase):
    """
    Tests for Room model
    """

    def setUp(self):
        self.name = "Test Room"
        self.code_name = "test-room"
        self.floor = 0
        self.room = Room.objects.create(name=self.name, code_name=self.code_name, floor=self.floor)

    def test_room_added_correctly(self):
        """
        Test if the room was added correctly and that the fields are set correctly
        """
        self.assertEqual(self.room.name, self.name, "The name wasn't set correctly")
        self.assertEqual(self.room.code_name, self.code_name, "The codename wasn't set correctly")
        self.assertEqual(self.room.floor, self.floor, "The floor wasn't set correctly")

    def test_room_mqtt_topics(self):
        """
        Test if the mqtt_(appliance/server)_topic properties on Room model generate correct topics
        """
        self.assertEqual(
            self.room.mqtt_appliance_topic,
            f"{settings.MQTT_TOPIC}/appliance/{self.room.code_name}",
            "Room MQTT topics aren't generated correctly",
        )

        self.assertEqual(
            self.room.mqtt_server_topic,
            f"{settings.MQTT_TOPIC}/server/{self.room.code_name}",
            "Room MQTT topics aren't generated correctly",
        )

    def test_room_add_duplicate(self):
        """
        Make sure it isn't possible to add a room with duplicate code_name
        """
        with pytest.raises(IntegrityError):
            Room.objects.create(name=self.name, code_name=self.code_name, floor=self.floor)


class ApplianceTest(TestCase):
    """
    Tests for Appliance model
    """

    def setUp(self):
        self.name = "Test Room"
        self.appliance_id = 1
        self.room = Room.objects.create(name="Test Room", code_name="room", floor=0)
        self.appliance: PolymorphicModel = Appliance.objects.create(  # type: ignore
            name=self.name, appliance_id=self.appliance_id, room=self.room
        )

    def test_appliance_added_correctly(self):
        """
        Test if the appliance was added correctly and that the fields are set correctly
        """
        self.assertEqual(self.appliance.name, self.name, "The name wasn't set correctly")
        self.assertEqual(
            self.appliance.appliance_id,
            self.appliance_id,
            "The appliance_id wasn't set correctly",
        )
        self.assertEqual(self.appliance.room, self.room, "The floor wasn't set correctly")

    def test_appliance_mqtt_topics(self):
        """
        Test if the mqtt_(appliance/server)_topic property
        on Appliance model generate correct topics
        """
        self.assertEqual(
            self.appliance.mqtt_server_topic,
            (
                f"{self.room.mqtt_server_topic}"
                f"/{self.appliance.polymorphic_ctype.model}"
                f"/{self.appliance_id}"
            ),
            "Appliance MQTT topic isn't generated correctly",
        )

        self.assertEqual(
            self.appliance.mqtt_appliance_topic,
            (
                f"{self.room.mqtt_appliance_topic}"
                f"/{self.appliance.polymorphic_ctype.model}"
                f"/{self.appliance_id}"
            ),
            "Appliance MQTT topic isn't generated correctly",
        )

    def test_appliance_add_duplicate(self):
        """
        Make sure it isn't possible to add an appliance with duplicate code_name
        """
        with pytest.raises(IntegrityError):
            Appliance.objects.create(name=self.name, appliance_id=self.appliance_id, room=self.room)
