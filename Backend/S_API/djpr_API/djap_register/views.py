# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    views.py                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/26 10:31:57 by eslamber          #+#    #+#              #
#    Updated: 2024/10/14 18:15:32 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
import requests

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
				json_response.set_cookie(key='jwt_token', value=token, httponly=True, samesite='Strict', max_age=3600)
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
				json_response.set_cookie(key='jwt_token', value=token, httponly=True, max_age=3600)
				return json_response
			else:
				return JsonResponse({"error": "Token not found in response"}, status=500)

		else:
			res = "Login failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)