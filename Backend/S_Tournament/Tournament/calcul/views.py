from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import check_password
from django.db import IntegrityError
from .models import Tournament, Player
import json
# import pyotp	<-- danger

# Create your views here.

# SELECT TOURNAMENT
def selectTournament(request):

	if request.method == 'POST':
		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)
#TODO Bouton 1 ?
		btn = data.get('btn')

		# Get or create a tournament instance
		tournament, created = Tournament.objects.get_or_create(id=1)

		if btn == 'btn1':
			if tournament.player_registered > 3:
				return JsonResponse({"error": "Vous avez déjà trop de joueurs inscrits", "return": "error"}, status=400)
			tournament.old_size = tournament.size
			tournament.size = 3
			tournament.champs_libre = tournament.size - tournament.player_registered

		elif btn == 'btn2':
			if tournament.player_registered > 4:
				return JsonResponse({"error": "Vous avez déjà trop de joueurs inscrits", "return": "error"}, status=400)
			tournament.old_size = tournament.size
			tournament.size = 4
			tournament.champs_libre = tournament.size - tournament.player_registered
			tournament.rounds_left = 2

		elif btn == 'btn3':
			if tournament.player_registered > 8:
				return JsonResponse({"error": "Vous avez déjà trop de joueurs inscrits", "return": "error"}, status=400)
			tournament.old_size = tournament.size
			tournament.size = 8
			tournament.champs_libre = tournament.size - tournament.player_registered
			tournament.rounds_left = 3

		tournament.save()
		return JsonResponse({"size": tournament.size, "old_size": tournament.old_size, "return": "selectTournament"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)




# CREATE PLAYER
def createPlayer(request):

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		name = data.get('name')
		index = data.get('index')
		tournament, created = Tournament.objects.get_or_create(id=1)

		if len(name) == 0:
			return JsonResponse({"error": "Le champs est vide !", "return": "error"}, status=400)
		if name in tournament.player_list:
			return JsonResponse({"error": "Le nom \"" + name + "\" est déjà utilisé !", "return": "error"}, status=400)
		if len(name) < 2:
			return JsonResponse({"error": "Le nom \"" + name + "\" est trop court !", "return": "error"}, status=400)
		if len(name) > 8:
			return JsonResponse({"error": "Le nom \"" + name + "\" est trop long !", "return": "error"}, status=400)
		if not name.isalnum():
			return JsonResponse({"error": "Le nom \"" + name + "\" ne doit pas contenir de caractères spéciaux !", "return": "error"}, status=400)


		tournament.player_registered = tournament.player_registered + 1
		tournament.old_size = tournament.old_size - tournament.player_registered
		tournament.player_list.append(name)

		player, created = Player.objects.get_or_create(name=name)
		player.save()

		tournament.players.add(player)
		tournament.save()

		return JsonResponse({"name": name, "index": index, "player_list": tournament.player_list, "fields": tournament.old_size, "return": "createPlayer"}, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)

# DELETE PLAYER
def deletePlayer(request):

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		name = data.get('name')
		index = data.get('index')
		nameContainer = data.get('nameContainer')

		tournament, created = Tournament.objects.get_or_create(id=1)
		tournament.player_registered -= 1
		tournament.player_list.remove(name)

		player, created = Player.objects.get_or_create(name=name)		# player = Player.objects.get(name=name)
		tournament.players.remove(player)

		player.delete()
		tournament.save()

		return JsonResponse({"name": name, "index": index, "player_list": tournament.player_list, "fields": tournament.old_size, "return": "deletePlayer"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


def initDB(request):

	if request.method == 'POST':

		tournament, created = Tournament.objects.get_or_create(id=1)

		tournament.player_registered = 0
		tournament.size = 0
		tournament.old_size = 0
		tournament.champs_libre = 0
		tournament.player_list = []
		tournament.players.clear()
		tournament.curr_round = 1
		tournament.rounds_left = 0
		player = Player.objects.all()
		player.delete()
		tournament.save()

		return JsonResponse({"return": "initDB"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


def validTournament(request):

	if request.method == 'POST':

		tournament, created = Tournament.objects.get_or_create(id=1)

		if tournament.size == 0 or tournament.size == None:
			return JsonResponse({"error": "Vous n'avez pas encore choisi la taille du tournoi !", "return": "error"}, status=400)
		if tournament.player_registered != tournament.size:
			return JsonResponse({"error": "Le nombre de joueur inscrit n'est pas égal au nombre de joueur attendu", "return": "error"}, status=400)

		return JsonResponse({"player_list": tournament.player_list, "return": "validTournament"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


# ############################################################################################################
# aff_tournament_bracket.js
# ############################################################################################################

def startGame(request):

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		return JsonResponse({"return": "startGame"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


def startTournament(request):

	if request.method == 'POST':
		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)
		player_list = data.get('player_list')
		shuffle_list(player_list)
		pairs = split_into_pairs(player_list)
		print("###############################################")
		print("| BRACKET : ", pairs, " |")
		return JsonResponse({"pairs": pairs}, status=200)
		#return JsonResponse({"player_list": data.get('player_list'), "return": "startTournament"}, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)

def shuffle_list(array):
	import random
	for i in range(len(array) - 1, 0, -1):
		j = random.randint(0, i)
		array[i], array[j] = array[j], array[i]
	return array

def split_into_pairs(joueurs):
	pairs = []
	for i in range(0, len(joueurs), 2):
		pair = joueurs[i:i + 2]
		pairs.append(pair)
	return pairs

# def resumeGame(request):

# 	if request.method == 'POST':

# 		try:
# 			data = json.loads(request.body)
# 		except json.JSONDecodeError:
# 			return JsonResponse({"error": "Invalid JSON"}, status=400)

# 		pong, created = Pong.objects.get_or_create(id=data.get('id'))


# 	return JsonResponse({"error": "Invalid request method"}, status=405)

def endGame(request):

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		tournament, created = Tournament.objects.get_or_create(id=1)
		try:
			player1 = Player.objects.get(name=data.get('player1'))
			player2 = Player.objects.get(name=data.get('player2'))
		except Player.DoesNotExist:
			return JsonResponse({"error": "Player does not exist"}, status=400)		# a voir si bonne facon d'empecher le front fournir des noms de joueurs qui n'existent pas
		if data.get('winner') == player1.name:
			player1.score = player1.score + 1 + tournament.rounds_left
		elif data.get('winner') == player2.name:
			player2.score = player2.score + 1 + tournament.rounds_left
		
		player1.match_played += 1
		player2.match_played += 1
		player1.save()
		player2.save()
		# print("data du endgame : ", data)
		print("+------------------------------------------ -  -")
		print("| Player " + player1.name + " : " + str(player1.score) + " | Player " + player2.name + " : " + str(player2.score))
		print("| 		Winner : " + data.get('winner'))
		# print("| Player " + player2.name + " : " + str(player2.score))
		print("+------------------------------------------ -  -")

		return JsonResponse({"player_list": tournament.player_list, "return": "endGame"}, status=200)

		# return JsonResponse({"return": "endGame"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)





def continueTournament(request):

	if request.method == 'POST':
		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		tournament, created = Tournament.objects.get_or_create(id=1)
		players_left = [player.name for player in Player.objects.all() if player.match_played < tournament.curr_round]
		if len(players_left) == 0:
			tournament.curr_round += 1
			tournament.rounds_left -= 1
			tournament.save()
			players_left = [player.name for player in Player.objects.all().order_by('-score')]
			if tournament.rounds_left == 0:
				player_score = [player.score for player in Player.objects.all().order_by('-score')]
				return JsonResponse({"leaderboard": players_left, "score" : player_score, "return": "endTournament"}, status=200)
		print("+------------------------------------------ -  -")
		print("| Current round : ", tournament.curr_round)
		print("| Total Players : ", tournament.player_list)
		print("+------------------------------------------ -  -")
		print("| Players left : ", players_left)
		# print("player match played : ", [player.match_played for player in Player.objects.all()])
		# print("tournament.curr_round == ", tournament.curr_round)
		# print("players_left == ", players_left)
		pairs = split_into_pairs(players_left)
		print("| match a faire : ", pairs)

		return JsonResponse({"pairs": pairs}, status=200)
		#return JsonResponse({"player_list": data.get('player_list'), "return": "startTournament"}, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)



# todo iportant : faire la diff entre player_list[] et players car l'un list de char, l'autre list de Player
# donc peut etre revoir les verificaitons et methode dans start/continue_tournament
