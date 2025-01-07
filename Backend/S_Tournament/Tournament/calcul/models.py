from django.db import models

class Player(models.Model):
	name = models.CharField(max_length=100)
	score = models.IntegerField(default=0)
	match_played = models.IntegerField(default=0)

class Tournament(models.Model):
	player_registered = models.IntegerField(default=0)
	size = models.IntegerField(default=0)
	old_size = models.IntegerField(default=0)
	champs_libre = models.IntegerField(default=0)
	player_list = models.JSONField(default=list)

	rounds = models.IntegerField(default=0)
	players = models.ManyToManyField(Player, related_name='players')

	# tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='players')	

# class Pairs(models.Model):
# # ici les paires de 2 players
# 	player1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player1')
# 	player2 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player2')
# 	tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='pairs')
