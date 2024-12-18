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

		print("data : ", data)
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

		elif btn == 'btn3':
			if tournament.player_registered > 8:
				return JsonResponse({"error": "Vous avez déjà trop de joueurs inscrits", "return": "error"}, status=400)
			tournament.old_size = tournament.size
			tournament.size = 8
			tournament.champs_libre = tournament.size - tournament.player_registered

		tournament.save()
		return JsonResponse({"size": tournament.size, "old_size": tournament.old_size, "return": "selectTournament"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)




# CREATE PLAYER
def createPlayer(request):
	print("Here we are in createPlayer")

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		print("data : ", data)
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
		tournament.save()

		return JsonResponse({"name": name, "index": index, "player_list": tournament.player_list, "fields": tournament.old_size, "return": "createPlayer"}, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)

# DELETE PLAYER
def deletePlayer(request):
	print("Here we are in deletePlayer")

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		print("data : ", data)
		name = data.get('name')
		index = data.get('index')
		nameContainer = data.get('nameContainer')

		tournament, created = Tournament.objects.get_or_create(id=1)
		tournament.player_registered -= 1
		tournament.player_list.remove(name)
		tournament.save()

		return JsonResponse({"name": name, "index": index, "player_list": tournament.player_list, "fields": tournament.old_size, "return": "deletePlayer"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


def initDB(request):
	print("Here we are in initDB")

	if request.method == 'POST':

		tournament, created = Tournament.objects.get_or_create(id=1)

		tournament.player_registered = 0
		tournament.size = 0
		tournament.old_size = 0
		tournament.champs_libre = 0
		tournament.player_list = []
		tournament.save()

		return JsonResponse({"return": "initDB"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


def validTournament(request):
	print("Here we are in validTournament")

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
	print("Here we are in startGame")

	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)

		print("data : ", data)

		return JsonResponse({"return": "startGame"}, status=200)

	return JsonResponse({"error": "Invalid request method"}, status=405)


# def resumeGame(request):

# 	if request.method == 'POST':

# 		try:
# 			data = json.loads(request.body)
# 		except json.JSONDecodeError:
# 			return JsonResponse({"error": "Invalid JSON"}, status=400)

# 		pong, created = Pong.objects.get_or_create(id=data.get('id'))

# 	return JsonResponse({"error": "Invalid request method"}, status=405)
