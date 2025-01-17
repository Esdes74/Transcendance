from django.db import models

class Player(models.Model):
	name = models.CharField(max_length=100)
	score = models.IntegerField(default=0)
	match_played = models.IntegerField(default=0)
	from_Tournament = models.CharField(max_length=100, default="")
	from_uuid = models.CharField(default=None, blank=False, null=False, max_length=40)

class Pair(models.Model):
	player1 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player1')
	player2 = models.ForeignKey(Player, on_delete=models.CASCADE, related_name='player2')
	index = models.IntegerField(default=0)


class Tournament(models.Model):
	player_registered = models.IntegerField(default=0)
	size = models.IntegerField(default=0)
	old_size = models.IntegerField(default=0)
	champs_libre = models.IntegerField(default=0)
	player_list = models.JSONField(default=list)

	curr_round = models.IntegerField(default=1)
	rounds_left = models.IntegerField(default=0)
	players = models.ManyToManyField(Player, related_name='players')
	pairs = models.ManyToManyField(Pair, related_name='pairs')

	username = models.CharField(
	max_length=150,
	default=None,
	blank=False,
	null=False
	)
	uuid = models.CharField(unique=True, default=None, blank=False,	null=False, max_length=40)

	# tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='players')	

# # ici les paires de 2 players
# 	tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='pairs')


# git stash : 6518405

