from django.db import models

# Create your models here.


class College(models.Model):
    name = models.CharField(max_length=255, unique=True)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    ranking = models.IntegerField()
    cut_off = models.FloatField()  # JEE or other exam cut-off score
    domain = models.CharField(max_length=255)  # Example: "Engineering, Medical, Law"
    seats_available = models.IntegerField()

    def __str__(self):
        return self.name

