# from rest_framework.decorators import api_view
# from rest_framework.response import Response
# import requests

# @api_view(['POST'])
# def login_view(request):
# 	# Débogage pour voir les cookies et les en-têtes CSRF
# 	print(f"Cookies = {request.COOKIES}")
# 	print(f"CSRF Token (META) = {request.META.get('HTTP_X_CSRFTOKEN')}")
	
# 	# Récupérer le username et password depuis request.data
# 	username = request.data.get('username')
# 	password = request.data.get('password')

# 	if not username or not password:
# 		return Response({"error": "Missing credentials"}, status=400)

# 	# Préparer l'URL du service externe
# 	external_service_url = "http://django-Auth:8000/auth/login/"
# 	payload = {
# 		'username': username,
# 		'password': password
# 	}

# 	# Ajout d'un header pour le CSRF si nécessaire
# 	csrf_token = request.META.get('HTTP_X_CSRFTOKEN')
# 	headers = {
# 		'Content-Type': 'application/json',
# 	}

# 	if csrf_token:
# 		headers['X-CSRFToken'] = csrf_token

# 	try:
# 		print(f"Sending request to {external_service_url} with payload {payload}")
		
# 		# Envoyer la requête avec JSON et cookies au service externe
# 		response = requests.post(external_service_url, json=payload, headers=headers, cookies=request.COOKIES)

# 		# Vérifier si la requête a réussi
# 		if response.status_code == 200:
# 			return Response(response.json(), status=200)
# 		else:
# 			# Afficher les détails pour déboguer en cas d'erreur
# 			print(f"Login failed with status code {response.status_code}")
# 			print(f"Response content: {response.content}")
# 			return Response({"error": "Login failed"}, status=response.status_code)

# 	except requests.exceptions.RequestException as e:
# 		print(f"Request exception: {str(e)}")
# 		return Response({"error": str(e)}, status=500)

from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['POST'])
def login_view(request):
	print(f"cookie = {request.COOKIES} et request.META = {request.META.get('HTTP_X_CSRFTOKEN')}") # Ajout pour debuggage
	username = request.data.get('username')
	password = request.data.get('password')

	if not username or not password:
		return Response({"error": "Missing credentials"}, status=400)

	print("bonjour2") # Ajout pour debuggage
	# Appeler un autre service pour gérer l'authentification
	external_service_url = "http://django-Auth:8000/auth/login/"
	payload = {
		'username': username,
		'password': password
	}

	# Ajout d'un header pour le CSRF si nécessaire
	csrf_token = request.META.get('HTTP_X_CSRFTOKEN')
	headers = {
		'Content-Type': 'application/x-www-form-urlencoded',
	}

	if csrf_token:
		headers['X-CSRFToken'] = csrf_token

	# COOKIE=get_cookies_from_request(request)
	COOKIE=request.META.get('HTTP_X_CSRFTOKEN') # plus util sauf pour le debug

	try:
		print("bonjour3") # Ajout pour debuggage
		print(f"Sending request to {external_service_url} with payload {payload} and cookie {COOKIE}")
		response = requests.post(external_service_url, data=payload, headers=headers, cookies=request.COOKIES)
		# Vérifier si la requête a réussi
		if response.status_code == 200:
			return Response(response.json(), status=200)
		else:
			print("bonjour4") # Ajout pour debuggage
			print(response.status_code) # Ajout pour debuggage
			return Response({"error": "Login failed"}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		print("bonjour5") # Ajout pour debuggage
		return Response({"error": str(e)}, status=500)
