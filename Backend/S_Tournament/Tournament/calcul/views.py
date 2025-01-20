from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import check_password
from django.db import IntegrityError
from .models import Tournament, Player, Pair
import json
from uuid import uuid4

# SELECT TOURNAMENT
def selectTournament(request):

	if request.method == 'POST':
		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		btn = data.get('btn')
		username = data.get('username')
		uuid = data.get('uuid')

		# Get or create a tournament instance
		tournament, created = Tournament.objects.get_or_create(username=username, uuid=uuid)

		if btn == 'btn1':
			if tournament.player_registered > 4:
				return JsonResponse({"error": "Vous avez déjà trop de joueurs inscrits", "return": "error"}, status=400)
			tournament.old_size = tournament.size
			tournament.size = 4
			tournament.champs_libre = tournament.size - tournament.player_registered
			tournament.rounds_left = 2

		elif btn == 'btn2':
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
		username = data.get('username')
		uuid = data.get('uuid')

		tournament, created = Tournament.objects.get_or_create(username=username, uuid=uuid)

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

		player, created = Player.objects.get_or_create(name=name, from_Tournament=username, from_uuid=uuid)
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
		username = data.get('username')
		uuid = data.get('uuid')

		tournament, created = Tournament.objects.get_or_create(username=username, uuid=uuid)
		tournament.player_registered -= 1
		tournament.player_list.remove(name)

		player, created = Player.objects.get_or_create(name=name, from_Tournament=username, from_uuid=uuid)		# player = Player.objects.get(name=name)
		tournament.players.remove(player)

		player.delete()
		tournament.save()

		return JsonResponse({"name": name, "index": index, "player_list": tournament.player_list, "fields": tournament.old_size, "return": "deletePlayer"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


def initDB(request):

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		uuid = str(uuid4())
		username = data.get('username')

		tournament, created = Tournament.objects.get_or_create(username=username, uuid=uuid)

		player = Player.objects.filter(from_Tournament=username, from_uuid=uuid)
		player.delete()
		tournament.delete()

		return JsonResponse({"return": "initDB", "uuid": uuid}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


def validTournament(request):

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)
		
		username = data.get('username')
		uuid = data.get('uuid')

		tournament, created = Tournament.objects.get_or_create(username=username, uuid=uuid)

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

		player1 = data.get('player1')
		player2 = data.get('player2')
		username = data.get('username')
		uuid = data.get('uuid')

		try:
			P1 = Player.objects.get(name=player1, from_Tournament=username, from_uuid=uuid)
			P2 = Player.objects.get(name=player2, from_Tournament=username, from_uuid=uuid)
		except Player.DoesNotExist:
			return JsonResponse({"error": "Player does not exist"}, status=400)

		tournament, created = Tournament.objects.get_or_create(username=username, uuid=uuid)
		pair = Pair.objects.get(player1=P1, player2=P2)
		tournament.pairs.remove(pair)
		pair.delete()
		tournament.save()

		return JsonResponse({"return": "startGame"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


def startTournament(request):

	if request.method == 'POST':
		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		player_list = data.get('player_list')
		username = data.get('username')
		uuid = data.get('uuid')

		shuffle_list(player_list)
		pairs = split_into_pairs(player_list, username, uuid)
		return JsonResponse({"pairs": pairs}, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)

def shuffle_list(array):
	import random
	for i in range(len(array) - 1, 0, -1):
		j = random.randint(0, i)
		array[i], array[j] = array[j], array[i]
	return array

def split_into_pairs(joueurs, username, uuid):
	pairs = []
	tournament, created = Tournament.objects.get_or_create(username=username, uuid=uuid)
	for i in range(0, len(joueurs), 2):
		pair = joueurs[i:i + 2]
		pairs.append(pair)

		player_pair, created = Pair.objects.get_or_create(player1=Player.objects.get(name=pair[0], from_Tournament=username, from_uuid=uuid), player2=Player.objects.get(name=pair[1], from_Tournament=username, from_uuid=uuid), index=i)
		player_pair.save()
		tournament.pairs.add(player_pair)
		print("index : ", i)
	tournament.save()
	return pairs


def endGame(request):

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		username = data.get('username')
		uuid = data.get('uuid')

		tournament, created = Tournament.objects.get_or_create(username=username, uuid=uuid)
		try:
			player1 = Player.objects.get(name=data.get('player1'), from_Tournament=username, from_uuid=uuid)
			player2 = Player.objects.get(name=data.get('player2'), from_Tournament=username, from_uuid=uuid)
		except Player.DoesNotExist:
			return JsonResponse({"error": "Player does not exist"}, status=400)		# a voir si bonne facon d'empecher le front fournir des noms de joueurs qui n'existent pas
		if data.get('winner') == player1.name:
			player1.score = player1.score + 2 ** tournament.rounds_left
		elif data.get('winner') == player2.name:
			player2.score = player2.score + 2 ** tournament.rounds_left
		
		player1.match_played += 1
		player2.match_played += 1
		player1.save()
		player2.save()

		return JsonResponse({"player_list": tournament.player_list, "return": "endGame"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


def continueTournament(request):

	if request.method == 'POST':
		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		username = data.get('username')
		uuid = data.get('uuid')

		tournament, created = Tournament.objects.get_or_create(username=username, uuid=uuid)
		if tournament.pairs.count() == 0:
			tournament.curr_round += 1
			tournament.rounds_left -= 1
			tournament.save()
			players_left = [player.name for player in tournament.players.all().order_by('-score')]
			pairs = split_into_pairs(players_left, username, uuid)
			if tournament.rounds_left == 0:
				player_score = [player.score for player in Player.objects.filter(from_Tournament=username, from_uuid=uuid).order_by('-score')]
				return JsonResponse({"leaderboard": players_left, "score" : player_score, "return": "endTournament"}, status=200)
			return JsonResponse({"pairs": pairs, "round": tournament.curr_round}, status=200)
		return JsonResponse({"pairs": [[pair.player1.name, pair.player2.name] for pair in tournament.pairs.all()], "round": tournament.curr_round}, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)
