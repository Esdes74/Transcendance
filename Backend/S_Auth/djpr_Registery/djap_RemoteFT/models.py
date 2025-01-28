from django.db import models

class StateModel(models.Model):
	state = models.CharField(max_length=50)

	def __str__(self):
		return self.value