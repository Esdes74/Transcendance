from django.db import models

# Create your models here.
class Users(models.Model):
	tok = models.CharField(max_length=255, unique=True, db_index=True)

	def __str__(self):
		return self.tok