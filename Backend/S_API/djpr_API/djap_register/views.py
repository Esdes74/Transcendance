# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    views.py                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/26 10:31:57 by eslamber          #+#    #+#              #
#    Updated: 2024/10/26 10:02:49 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import requests
import jwt
import os
from jwt.exceptions import InvalidTokenError, DecodeError
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

# TODO: Passer en GET
@api_view(['POST'])
def login_view(request):
	username = request.data.get('username')
	password = request.data.get('password')

	if not username or not password:
		return Response({"error": "Missing credentials"}, status=400)

	# Appeler un autre service pour gérer l'authentification
	external_service_url = "http://django-Auth:8000/registery/register/"
	payload = {
		'username': username,
		'password': password
	}

	try:
		response = requests.post(external_service_url, data=payload)#, headers=headers, cookies=request.COOKIES)

		if response.status_code == 200:
			token = response.json().get('token')
			if token:
				# Créez la réponse JSON avec le token
				json_response = JsonResponse(response.json(), status=200)
				# TODO: Vérifier que le cookie respecte bien les règles de sécuritées
				json_response.set_cookie(key='jwt_token', value=token, httponly=False, max_age=180)
				return json_response
			else:
				return JsonResponse({"error": "Token not found in response"}, status=500)
		else:
			res = "Login failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def create_view(request):
	username = request.data.get('username')
	password = request.data.get('password')
	pseudo = request.data.get('pseudo')
	phone_nb = request.data.get('phone_nb')
	mail = request.data.get('mail')
	adress = request.data.get('adress')

	# Si je n'ai pas les champs obligatoires
	if not username or not password or not pseudo:
		return Response({"error": "Missing credentials"}, status=400)

	# Appeler un autre service pour gérer l'authentification
	external_service_url = "http://django-Auth:8000/registery/create/"
	payload = {
		'username': username,
		'password': password,
		'pseudo': pseudo,
		'phone_nb': phone_nb,
		'mail': mail,
		'adress': adress
	}

	try:
		response = requests.post(external_service_url, data=payload)#, headers=headers, cookies=request.COOKIES)

		if response.status_code == 201:
			token = response.json().get('token')
			if token:
				# Créez la réponse JSON avec le token
				json_response = JsonResponse(response.json(), status=201)
				# TODO: Vérifier que le cookie respecte bien les règles de sécuritées
				json_response.set_cookie(key='jwt_token', value=token, httponly=False, max_age=180)
				return json_response
			else:
				return JsonResponse({"error": "Token not found in response"}, status=500)

		else:
			res = "Login failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

@api_view(['POST'])
def otp_verif(request):
	password = request.data.get('password')
	token = request.COOKIES.get('jwt_token')

	if not token or not password:
		return Response({"error": "Missing credentials"}, status=400)

	# Verification du token
	try:
		decoded_token = jwt.decode(
			token,
			os.getenv('SECRET_KEY'),
			algorithms=[os.getenv('ALGO')],
			options={"verify_signature": True}
		)

		grade = decoded_token.get('grade')
		username = decoded_token.get('username')
		print(f"grade = {grade}")
		print(f"username = {username}")
		if (grade != 'auth' or not grade or not username):
			return Response({"error": "Unauthorized token"}, status=401)
	except InvalidTokenError:
		return Response({"error": "Invalid token"}, status=401)
	except DecodeError:
		return Response({"error": "Token error"}, status=401)

	# Appeler un autre service pour gérer l'authentification
	external_service_url = "http://django-Auth:8000/registery/2fa/"
	payload = {
		'username': username,
		'password': password
	}

	try:
		response = requests.post(external_service_url, data=payload)#, headers=headers, cookies=request.COOKIES)

		if response.status_code == 200:
			token = response.json().get('token')
			if token:
				# Créez la réponse JSON avec le token
				json_response = JsonResponse(response.json(), status=200)
				json_response.set_cookie(key='jwt_token', value=token, httponly=True, samesite='Strict', max_age=3600)
				return json_response
			else:
				return JsonResponse({"error": "Token not found in response"}, status=500)
		else:
			res = "Login failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)