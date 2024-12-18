from django.db import models

# Create your models here.
class pongDB(models.Model):
	# player1 = models.CharField(max_length=100)
	# player2 = models.CharField(max_length=100)
	scorePlayer1 = models.IntegerField(default=0)
	scorePlayer2 = models.IntegerField(default=0)
	# winner = models.CharField(max_length=100)
	# date = models.DateTimeField(auto_now_add=True)

	# def __str__(self):
	# 	return self.player1 + " VS " + self.player2
