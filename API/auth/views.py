from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

# def get_cookies_from_request(request):
# 	cookies = {}
# 	if 'HTTP_X_CSRFTOKEN' in request.META:
# 		cookie_header = request.META['HTTP_X_CSRFTOKEN']
# 		print(f"cookie = {cookie_header}")
# 		cookies = dict(cookie.split('=') for cookie in cookie_header.split('; '))
# 	return cookies

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

	# COOKIE=get_cookies_from_request(request)
	COOKIE=request.META.get('HTTP_X_CSRFTOKEN')

	try:
		print("bonjour3") # Ajout pour debuggage
		print(f"Sending request to {external_service_url} with payload {payload} and cookie {COOKIE}")
		response = requests.post(external_service_url, json=payload, cookies=request.COOKIES)
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
