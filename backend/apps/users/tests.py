from datetime import date, datetime

import pytest
from django.db.utils import IntegrityError
from django.test import TestCase

from .models import User


class UserTest(TestCase):
    def setUp(self):
        self.email = "test@testing.com"
        self.password = "testpass"
        self.birth_date = date(1990, 6, 1)
        self.user = User.objects.create_user(self.email, self.password, birth_date=self.birth_date)

    def test_user_email_correct(self):
        self.assertEqual(self.user.email, "test@testing.com", "Email is wrong on the user")

    def test_user_superuser_status(self):
        self.assertEqual(self.user.is_superuser, False, "User was superuser by default")

    def test_user_login(self):
        status = self.client.login(email=self.email, password=self.password)
        self.assertEqual(status, True, "User couldn't login with correct credentials")

    def test_user_non_unique(self):
        with pytest.raises(IntegrityError):
            User.objects.create_user(self.email, self.password)

    def test_user_correct_age(self):
        delta = datetime.now().date() - self.birth_date
        years = int(delta.days / 365.25)

        self.assertEqual(self.user.get_age(), years, "Age returned for the user was wrong")

    def test_user_fullname(self):
        self.assertEqual(self.user.get_full_name(), self.email, "User full name didn't fallback to email")
