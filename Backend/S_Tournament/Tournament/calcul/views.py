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

		if btn is None or username is None or uuid is None:
			return JsonResponse({"error": "invalid values"}, status=400)
		if not isinstance(btn, str) or not isinstance(username, str) or not isinstance(uuid, str):
			return JsonResponse({"error": "invalid values"}, status=400)
		# Get a tournament instance
		tournament , created = Tournament.objects.get_or_create(username=username, uuid=uuid)
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



		if name is None or index is None or username is None or uuid is None:
			return JsonResponse({"error": "Missing, undefined or bad values"}, status=400)
		if not isinstance(name, str) or not isinstance(index, int) or not isinstance(username, str) or not isinstance(uuid, str):
			return JsonResponse({"error": "Missing, undefined or bad values"}, status=400)
		try:
			tournament = Tournament.objects.get(username=username, uuid=uuid)
		except Tournament.DoesNotExist:
			return JsonResponse({"error": "Tournament does not exist"}, status=400)
		if len(name) == 0:
			return JsonResponse({"error": "Le champs est vide", "return": "error"}, status=400)
		if name in tournament.player_list:
			return JsonResponse({"error": "Ce nom est déjà utilisé", "return": "error"}, status=400)
		if len(name) < 2:
			return JsonResponse({"error": "Ce nom est trop court", "return": "error"}, status=400)
		if len(name) > 8:
			return JsonResponse({"error": "Ce nom est trop long", "return": "error"}, status=400)
		if not name.isalnum():
			return JsonResponse({"error": "Ce nom ne doit pas contenir de caractères spéciaux", "return": "error"}, status=400)
		if tournament.player_registered >= tournament.size:
			return JsonResponse({"error": "Vous avez déjà trop de joueurs inscrits", "return": "error"}, status=400)

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
		username = data.get('username')
		uuid = data.get('uuid')

		if name is None or index is None or username is None or uuid is None:
			return JsonResponse({"error": "Invalid values"}, status=400)
		if not isinstance(name, str) or not isinstance(index, int) or not isinstance(username, str) or not isinstance(uuid, str):
			return JsonResponse({"error": "Invalid values"}, status=400)
		try:
			tournament = Tournament.objects.get(username=username, uuid=uuid)
			player = Player.objects.get(name=name, from_Tournament=username, from_uuid=uuid)
		except (Tournament.DoesNotExist, Player.DoesNotExist):
			return JsonResponse({"error": "Tournament or Player does not exist"}, status=400)
		if player not in tournament.players.all() or name not in tournament.player_list:
			return JsonResponse({"error": "Player is not in the tournament"}, status=400)
		tournament.player_registered -= 1
		tournament.player_list.remove(name)
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
		if username is None:
			return JsonResponse({"error": "Invalid values"}, status=400)
		if not isinstance(uuid, str) or not isinstance(username, str):
			return JsonResponse({"error": "Invalid values"}, status=400)
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
		if username is None or uuid is None:
			return JsonResponse({"error": "Invalid values"}, status=400)
		if not isinstance(uuid, str) or not isinstance(username, str):
			return JsonResponse({"error": "Invalid values"}, status=400)
		try:
			tournament = Tournament.objects.get(username=username, uuid=uuid)
		except Tournament.DoesNotExist:
			return JsonResponse({"error": "Tournament does not exist"}, status=400)
		if tournament.size == 0 or tournament.size == None:
			return JsonResponse({"error": "Vous n'avez pas encore choisi la taille du tournoi", "return": "error"}, status=400)
		if tournament.player_registered != tournament.size:
			return JsonResponse({"error": "Valider tous les joueurs", "return": "error"}, status=400)
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
		if player1 is None or player2 is None or username is None or uuid is None:
			return JsonResponse({"error": "Invalid values"}, status=400)
		if not isinstance(player1, str) or not isinstance(player2, str) or not isinstance(username, str) or not isinstance(uuid, str):
			return JsonResponse({"error": "Invalid values"}, status=400)
		try:
			P1 = Player.objects.get(name=player1, from_Tournament=username, from_uuid=uuid)
			P2 = Player.objects.get(name=player2, from_Tournament=username, from_uuid=uuid)
			tournament = Tournament.objects.get(username=username, uuid=uuid)
			pair = Pair.objects.get(player1=P1, player2=P2)
		except (Player.DoesNotExist, Tournament.DoesNotExist, Pair.DoesNotExist):
			return JsonResponse({"error": "Invalid Instances"}, status=400)
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

		if player_list is None or username is None or uuid is None:
			return JsonResponse({"error": "Missing or undefined values"}, status=400)
		if not isinstance(player_list, list) or not all(isinstance(name, str) for name in player_list) or not isinstance(username, str) or not isinstance(uuid, str):
			return JsonResponse({"error": "Missing, undefined or bad values"}, status=400)
		shuffle_list(player_list)
		try:
			pairs = split_into_pairs(player_list, username, uuid)
			print(pairs)
		except Exception:
			return JsonResponse({"error": "Tournament does not exist"}, status=400)
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
	try:
		tournament = Tournament.objects.get(username=username, uuid=uuid)
	except Tournament.DoesNotExist:
		raise Exception("Tournament")
	for i in range(0, len(joueurs), 2):
		pair = joueurs[i:i + 2]
		pairs.append(pair)
		try :
			player_pair, created = Pair.objects.get_or_create(player1=Player.objects.get(name=pair[0], from_Tournament=username, from_uuid=uuid), player2=Player.objects.get(name=pair[1], from_Tournament=username, from_uuid=uuid), index=i)
		except Player.DoesNotExist:
			raise Exception("Player")
		player_pair.save()
		tournament.pairs.add(player_pair)
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
		winner = data.get('winner')

		if username is None or uuid is None or winner is None:
			return JsonResponse({"error": "Missing or undefined values"}, status=400)
		if not isinstance(username, str) or not isinstance(uuid, str) or not isinstance(winner, str):
			return JsonResponse({"error": "Missing, undefined or bad values"}, status=400)
		try:
			tournament = Tournament.objects.get(username=username, uuid=uuid)
			player1 = Player.objects.get(name=data.get('player1'), from_Tournament=username, from_uuid=uuid)
			player2 = Player.objects.get(name=data.get('player2'), from_Tournament=username, from_uuid=uuid)
		except (Player.DoesNotExist, Tournament.DoesNotExist):
			return JsonResponse({"error": "Player or Tournament does not exist"}, status=400)
		if winner == player1.name:
			player1.score = player1.score + 2 ** tournament.rounds_left
		elif winner == player2.name:
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
		if username is None or uuid is None:
			return JsonResponse({"error": "Missing or undefined values"}, status=400)
		if not isinstance(username, str) or not isinstance(uuid, str):
			return JsonResponse({"error": "invalid values"}, status=400)
		try:
			tournament = Tournament.objects.get(username=username, uuid=uuid)
		except Tournament.DoesNotExist:
			return JsonResponse({"error": "Tournament does not exist"}, status=400)
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
