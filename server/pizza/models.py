from django.db import models

class Pizza(models.Model):
    name = models.CharField(max_length=100)
    ingredients = models.TextField()
    rating = models.IntegerField()
    comment = models.TextField(blank=True)

    def __str__(self):
        return self.name
