from django.db import models
from django.contrib.postgres.fields import ArrayField

class Tournament(models.Model):
    player_registered = models.IntegerField(default=0)
    size = models.IntegerField(default=0)
    old_size = models.IntegerField(default=0)
    champs_libre = models.IntegerField(default=0)
    player_list = models.JSONField(default=list)

# class Tournament(models.Model):
# 	player_registered = models.IntegerField(default=0)
# 	size = models.IntegerField(default=0)
# 	old_size = models.IntegerField(default=0)
# 	champs_libre = models.IntegerField(default=0)
# 	player_list = ArrayField(models.CharField(max_length=100), default=list)

#
# class Player(models.Model):
# 	name = models.CharField(max_length=100)
# 	winscore = models.IntegerField(default=0)
# 	game_played = models.IntegerField(default=0)
#
# class Pair(models.Model):
# 	Player1 = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True)
# 	Player2 = models.ForeignKey(Player, on_delete=models.SET_NULL, null=True)
# 	# score = models.IntegerField(default=0)
#
# class Pairing_list(models.Model):
# 	# from .models import Pair
# 	pairs = models.ManyToManyField(Pair, related_name='pairing_lists')




	# tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='players')	
