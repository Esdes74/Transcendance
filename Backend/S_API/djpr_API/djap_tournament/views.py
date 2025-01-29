import requests
import jwt
import os
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.permissions import AllowAny
from djpr_API.decorator import jwt_required_2fa, auth_required
import json

# Select Tournament is here to select the number of players in the tournament
@auth_required
@api_view(['POST'])
def selectTournament(request):
	try:
		data = json.loads(request.body)
	except json.JSONDecodeError:
		return JsonResponse({"error": "Invalid JSON"}, status=400)
	except TypeError:
		return JsonResponse({"error": "Invalid request body type"}, status=400)
	except Exception as e:
		return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

	username = getattr(request, 'username', None)
	if username is None:
		return JsonResponse({"error": "Invalid username"}, status=400)
	data['username'] = username

	if request.method == 'POST':

		try:
			response = requests.post('http://django-tournament:8000/tournament/selectTournament/', json=data)
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=502)
		except requests.exceptions.RequestException as req_err:
			return JsonResponse({"error": f"Request error occurred: {req_err}"}, status=503)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)

# Create Player is here to create a player in the tournament
@auth_required
@api_view(['POST'])
def createPlayer(request):
	try:
		data = json.loads(request.body)
	except json.JSONDecodeError:
		return JsonResponse({"error": "Invalid JSON"}, status=400)
	except TypeError:
		return JsonResponse({"error": "Invalid request body type"}, status=400)
	except Exception as e:
		return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

	username = getattr(request, 'username', None)
	if username is None:
		return JsonResponse({"error": "Invalid username"}, status=400)
	data['username'] = username

	if request.method == 'POST':

		try:
			response = requests.post('http://django-tournament:8000/tournament/createPlayer/', json=data)
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=502)
		except requests.exceptions.RequestException as req_err:
			return JsonResponse({"error": f"Request error occurred: {req_err}"}, status=503)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)

# deletePlayer is here to delete a player in the tournament
@auth_required
@api_view(['POST'])
def deletePlayer(request):
	try:
		data = json.loads(request.body)
	except json.JSONDecodeError:
		return JsonResponse({"error": "Invalid JSON"}, status=400)
	except TypeError:
		return JsonResponse({"error": "Invalid request body type"}, status=400)
	except Exception as e:
		return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

	username = getattr(request, 'username', None)
	if username is None:
		return JsonResponse({"error": "Invalid username"}, status=400)
	data['username'] = username

	if request.method == 'POST':

		try:
			response = requests.post('http://django-tournament:8000/tournament/deletePlayer/', json=data)
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=502)
		except requests.exceptions.RequestException as req_err:
			return JsonResponse({"error": f"Request error occurred: {req_err}"}, status=503)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@auth_required
@api_view(['POST'])
def initDB(request):
	try:
		data = json.loads(request.body)
	except json.JSONDecodeError:
		return JsonResponse({"error": "Invalid JSON"}, status=400)
	except TypeError:
		return JsonResponse({"error": "Invalid request body type"}, status=400)
	except Exception as e:
		return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

	username = getattr(request, 'username', None)
	if username is None:
		return JsonResponse({"error": "Invalid username"}, status=400)
	data['username'] = username

	if request.method == 'POST':

		try:
			response = requests.post('http://django-tournament:8000/tournament/initDB/', json=data)
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=502)
		except requests.exceptions.RequestException as req_err:
			return JsonResponse({"error": f"Request error occurred: {req_err}"}, status=503)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@auth_required
@api_view(['POST'])
def validTournament(request):
	try:
		data = json.loads(request.body)
	except json.JSONDecodeError:
		return JsonResponse({"error": "Invalid JSON"}, status=400)
	except TypeError:
		return JsonResponse({"error": "Invalid request body type"}, status=400)
	except Exception as e:
		return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

	username = getattr(request, 'username', None)
	if username is None:
		return JsonResponse({"error": "Invalid username"}, status=400)
	data['username'] = username

	if request.method == 'POST':

		try:
			response = requests.post('http://django-tournament:8000/tournament/validTournament/', json=data)
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=502)
		except requests.exceptions.RequestException as req_err:
			return JsonResponse({"error": f"Request error occurred: {req_err}"}, status=503)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@auth_required
@api_view(['POST'])
def startTournament(request):
	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)
		except TypeError:
			return JsonResponse({"error": "Invalid request body type"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

		username = getattr(request, 'username', None)
		if username is None:
			return JsonResponse({"error": "Invalid username"}, status=400)
		data['username'] = username

		try:
			response = requests.post('http://django-tournament:8000/tournament/startTournament/', json=data)
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=502)
		except requests.exceptions.RequestException as req_err:
			return JsonResponse({"error": f"Request error occurred: {req_err}"}, status=503)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@auth_required
@api_view(['POST'])
def startGame(request):
	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)
		except TypeError:
			return JsonResponse({"error": "Invalid request body type"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

		username = getattr(request, 'username', None)
		if username is None:
			return JsonResponse({"error": "Invalid username"}, status=400)
		data['username'] = username

		try:
			response = requests.post('http://django-tournament:8000/tournament/startGame/', json=data)
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=502)
		except requests.exceptions.RequestException as req_err:
			return JsonResponse({"error": f"Request error occurred: {req_err}"}, status=503)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@auth_required
@api_view(['POST'])
def endGame(request):
	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)
		except TypeError:
			return JsonResponse({"error": "Invalid request body type"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)
		
		username = getattr(request, 'username', None)
		if username is None:
			return JsonResponse({"error": "Invalid username"}, status=400)
		data['username'] = username

		try:
			response = requests.post('http://django-tournament:8000/tournament/endGame/', json=data)
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=502)
		except requests.exceptions.RequestException as req_err:
			return JsonResponse({"error": f"Request error occurred: {req_err}"}, status=503)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)

@auth_required
@api_view(['POST'])
def continueTournament(request):
	if request.method == 'POST':

		try:
			data = json.loads(request.body)
		except json.JSONDecodeError:
			return JsonResponse({"error": "Invalid JSON"}, status=400)
		except TypeError:
			return JsonResponse({"error": "Invalid request body type"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"An unexpected error occurred: {str(e)}"}, status=500)

		username = getattr(request, 'username', None)
		if username is None:
			return JsonResponse({"error": "Invalid username"}, status=400)
		data['username'] = username

		try:
			response = requests.post('http://django-tournament:8000/tournament/continueTournament/', json=data)
			response_data = response.json()
		except ValueError:
			return JsonResponse({"error": "Invalid response from internal API"}, status=502)
		except requests.exceptions.RequestException as req_err:
			return JsonResponse({"error": f"Request error occurred: {req_err}"}, status=503)
		return JsonResponse(response_data, status=response.status_code)
	return JsonResponse({"error": "Invalid request method"}, status=405)
