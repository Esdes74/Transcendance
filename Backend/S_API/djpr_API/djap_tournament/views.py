import requests
import jwt
import os
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from djpr_API.decorator import jwt_required_2fa
import json

# Select Tournament is here to select the number of players in the tournament
@api_view(['POST'])
def selectTournament(request):
	print("Here we are in selectTournament")

	data = json.loads(request.body)
	print("SELECT TOURNAMENT data : ", data)

	if request.method == 'POST':

		response = requests.post('http://django-tournament:8000/tournament/selectTournament/', json=data)
		try:
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=500)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)




# Create Player is here to create a player in the tournament
@api_view(['POST'])
def createPlayer(request):
	print("Here we are in createPlayer")

	data = json.loads(request.body)
	print("CREATE PLAYER data : ", data)
	if request.method == 'POST':

		response = requests.post('http://django-tournament:8000/tournament/createPlayer/', json=data)
		try:
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=500)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)


# deletePlayer is here to delete a player in the tournament
@api_view(['POST'])
def deletePlayer(request):
	print("Here we are in deletePlayer")

	data = json.loads(request.body)
	print("DELETE PLAYER data : ", data)

	if request.method == 'POST':

		response = requests.post('http://django-tournament:8000/tournament/deletePlayer/', json=data)
		try:
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=500)
		return JsonResponse(response_data, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@api_view(['POST'])
def initDB(request):
	print("Here we are in initDB")

	if request.method == 'POST':

		response = requests.post('http://django-tournament:8000/tournament/initDB/', json={})
		try:
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=500)
		return JsonResponse(response_data, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@api_view(['POST'])
def validTournament(request):
	print("Here we are in initDB")

	if request.method == 'POST':

		response = requests.post('http://django-tournament:8000/tournament/validTournament/', json={})
		try:
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=500)
		return JsonResponse(response_data, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)


# ############################################################################################################
# aff_tournament_bracket.js
# ############################################################################################################

@api_view(['POST'])
def startTournament(request):
	print("Here we are in startTournament")
	if request.method == 'POST':
		data = json.loads(request.body)
		response = requests.post('http://django-tournament:8000/tournament/startTournament/', json=data)
		try:
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=500)	# verif les error500
		return JsonResponse(response_data, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@api_view(['POST'])
def startGame(request):
	print("Here we are in startGame")

	data = json.loads(request.body)
	print("START GAME data : ", data)

	if request.method == 'POST':

		response = requests.post('http://django-tournament:8000/tournament/startGame/', json=data)
		try:
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=500)
		return JsonResponse(response_data, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@api_view(['POST'])
def endGame(request):
	print("Here we are in endGame")

	data = json.loads(request.body)
	print("END GAME data : ", data)

	if request.method == 'POST':

		response = requests.post('http://django-tournament:8000/tournament/endGame/', json=data)
		try:
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=500)
		return JsonResponse(response_data, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@api_view(['POST'])
def continueTournament(request):
	print("Here we are in continueTournament")

	data = json.loads(request.body)
	print("CONTINUE TOURNAMENT data : ", data)

	if request.method == 'POST':

		response = requests.post('http://django-tournament:8000/tournament/continueTournament/', json=data)
		try:
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=500)
		return JsonResponse(response_data, status=200)
	return JsonResponse({"error": "Invalid request method"}, status=405)
