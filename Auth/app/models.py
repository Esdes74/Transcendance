from django.db import models

# Create your models here.
class Personne(models.Model):
	nom = models.CharField(max_length=100, default='defName')
	mdp = models.CharField(max_length=100, default='defPass')

	def __str__(self):
		return self.nom