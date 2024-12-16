from django.db import models

class Tournament(models.Model):
	player_registered = models.IntegerField(default=0)
	size = models.IntegerField(default=0)
	old_size = models.IntegerField(default=0)
	champs_libre = models.IntegerField(default=0)
	player_list = models.JSONField(default=list)

class Player(models.Model):
	name = models.CharField(max_length=100)
	tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='players')	
