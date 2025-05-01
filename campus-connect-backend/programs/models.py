from django.db import models

# Create your models here.

from colleges.models import College  # Import College model

class Program(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.IntegerField()  # Duration in years
    college = models.ForeignKey(College, on_delete=models.CASCADE, related_name="programs")

    def __str__(self):
        return self.name
