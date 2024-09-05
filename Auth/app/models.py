from django.db import models

# Create your models here.
class Personne(models.Model):
    nom = models.CharField(max_length=100)
	mdp = models.CharField(max_length=100)

    def __str__(self):
        return self.nom