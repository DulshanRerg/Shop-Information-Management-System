from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    """
    Custom user model with role-based access.
    Inherits Django's AbstractUser for built-in auth functionality.
    """
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('staff', 'Staff'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='staff')

    def __str__(self):
        return f"{self.username} ({self.role})"
