# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    views.py                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/26 10:31:57 by eslamber          #+#    #+#              #
#    Updated: 2024/12/06 17:46:28 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import requests
import jwt
import os
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
# from djap_register.models import UserProfile
from .save_new_user import save_new_user
from .logout import logout
from .reset_cookie import reset_cookie
from rest_framework.permissions import AllowAny
from djpr_API.decorator import jwt_required_2fa, auth_required, no_token_requiered, no_jwt_token_requiered, no_ft_token_requiered
from djap_register.models import FtTokenModel

# TODO: Passer en GET
@no_token_requiered
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
				# TODO: Je pens qu'il faudra le passer en https et en secure
				json_response.set_cookie(key='jwt_token', value=token, httponly=True, samesite='Strict', max_age=180)

				# Archivage du user_id pour l'identifier comme authentifié plus tard
				save_new_user(token)

				return json_response
			else:
				return JsonResponse({"error": "Token not found in response"}, status=500)
		else:
			res = "Login failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

@no_token_requiered
@api_view(['POST'])
def create_view(request):
	username = request.data.get('username')
	password = request.data.get('password')
	pseudo = request.data.get('pseudo')
	phone_nb = request.data.get('phone_nb')
	mail = request.data.get('mail')

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
	}

	try:
		response = requests.post(external_service_url, data=payload)#, headers=headers, cookies=request.COOKIES)

		if response.status_code == 201:
			token = response.json().get('token')
			if token:
				# Créez la réponse JSON avec le token
				json_response = JsonResponse(response.json(), status=201)
				# TODO: Vérifier que le cookie respecte bien les règles de sécuritées
				# TODO: Je pens qu'il faudra le passer en https et en secure
				json_response.set_cookie(key='jwt_token', value=token, httponly=True, samesite='Strict', max_age=180)

				# Archivage du user_id pour l'identifier comme authentifié plus tard
				save_new_user(token)

				return json_response
			else:
				return JsonResponse({"error": "Token not found in response"}, status=500)

		else:
			res = "Login failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

@jwt_required_2fa
@no_ft_token_requiered
@api_view(['POST'])
def otp_verif(request):
	password = request.data.get('password')
	username = getattr(request, 'username', None)

	if not username or not password:
		return Response({"error": "Missing credentials"}, status=400)

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

@no_token_requiered
@api_view(['POST'])
def stock(request):
	send_state = request.data.get('sendState')

	if not send_state:
		return Response({"error": "Missing Credentials"}, status=400)
	if (len(send_state) != 50):
		return Response({"error": "Invald data format"}, status=400)

	external_service_url = "http://django-Auth:8000/remoteft/stock/"
	payload = {
		'sendState': send_state
	}

	try:
		response = requests.post(external_service_url, data=payload)

		if response.status_code == 201:
			return Response({"message": "Data succesfully created"}, status=201)
		else:
			res = "Stock failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

@no_token_requiered
@api_view(['POST'])
def make_token(request):
	send_state = request.data.get('sendState')
	send_code = request.data.get('sendCode')

	if not send_state or not send_code:
		return Response({"error": "Missing Credentials"}, status=400)
	if (len(send_state) != 50 or len(send_code) != 64):
		return Response({"error": "Invald data format"}, status=400)

	external_service_url = "http://django-Auth:8000/remoteft/make_token/"
	payload = {
		'sendState': send_state,
		'sendCode': send_code
	}

	try:
		response = requests.post(external_service_url, data=payload)

		if response.status_code == 200:
			token = response.json().get('token')
			if token:
				# Créez la réponse JSON avec le token
				json_response = JsonResponse(response.json(), status=200)
				json_response.set_cookie(key='42_token', value=token, httponly=True, samesite='Strict', max_age=3600)
				new_token = FtTokenModel.objects.create(token=token)
				new_token.save()
				return json_response
			else:
				return JsonResponse({"error": "Token not found in response"}, status=500)
		else:
			res = "Stock failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

# TODO: A tester
@auth_required
@api_view(['POST'])
def logout_view(request):
	json_response = JsonResponse({"message": "Logout complete"}, status=200)
	json_response = logout(request, json_response)
	return json_response

# TODO: A tester
@auth_required
@api_view(['POST'])
def delete(request):
	username = request.data.get('username')

	if not username:
		return Response({"error": "Missing credentials"}, status=400)

	# Appeler un autre service pour gérer l'authentification
	external_service_url = "http://django-Auth:8000/settings/delete/"
	payload = {
		'username': username,
	}

	try:
		response = requests.post(external_service_url, data=payload)#, headers=headers, cookies=request.COOKIES)

		if response.status_code == 204:
			json_response = JsonResponse({}, status=204)
			json_response = logout(request, json_response)
			return json_response
		else:
			res = "Delete failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

# TODO: A tester
@auth_required
@api_view(['POST'])
def choose_lang(request):
	username = request.data.get('username')
	new_lang = request.data.get('newLang')

	if not username or not new_lang:
		return Response({"error": "Missing credentials"}, status=400)
	
	if (new_lang != 'fr' != 'an' != 'es'):
		return Response({"error": "Wong credentials"}, status=400)

	# Appeler un autre service pour gérer l'authentification
	external_service_url = "http://django-Auth:8000/settings/choose_lang/"
	payload = {
		'username': username,
		'newLang': new_lang,
	}

	try:
		response = requests.post(external_service_url, data=payload)#, headers=headers, cookies=request.COOKIES)

		if response.status_code == 200:
			json_response = JsonResponse(response.json(), status=200)
			json_response = reset_cookie(request, response, json_response)
			return json_response
		else:
			res = "Delete failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

# TODO: A tester
@auth_required
@api_view(['POST'])
def choose_verif(request):
	username = request.data.get('username')
	new_2fa = request.data.get('new2fa')

	if not username or not new_2fa:
		return Response({"error": "Missing credentials"}, status=400)

	# Appeler un autre service pour gérer l'authentification
	external_service_url = "http://django-Auth:8000/settings/choose_verif/"
	payload = {
		'username': username,
		'new2fa': new_2fa,
	}

	try:
		response = requests.post(external_service_url, data=payload)#, headers=headers, cookies=request.COOKIES)

		if response.status_code == 200:
			json_response = JsonResponse(response.json(), status=200)
			json_response = reset_cookie(request, response, json_response)
			return json_response
		else:
			res = "Delete failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

# TODO: A tester
@auth_required
@api_view(['GET'])
def get_lang(request):
	username = request.query_params.get('username')

	if not username or not new_2fa:
		return Response({"error": "Missing credentials"}, status=400)

	# Appeler un autre service pour gérer l'authentification
	external_service_url = "http://django-Auth:8000/settings/get_lang/"
	params = {
		'username': username,
	}

	try:
		response = requests.get(external_service_url, params=params)#, headers=headers, cookies=request.COOKIES)

		if response.status_code == 200:
			json_response = JsonResponse(response.json(), status=200)
			json_response = reset_cookie(request, response, json_response)
			return json_response
		else:
			res = "Request failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)

# TODO: A tester
@auth_required
@api_view(['GET'])
def get_verif(request):
	username = request.query_params.get('username')

	if not username or not new_2fa:
		return Response({"error": "Missing credentials"}, status=400)

	# Appeler un autre service pour gérer l'authentification
	external_service_url = "http://django-Auth:8000/settings/get_verif/"
	params = {
		'username': username,
	}

	try:
		response = requests.get(external_service_url, params=params)#, headers=headers, cookies=request.COOKIES)

		if response.status_code == 200:
			json_response = JsonResponse(response.json(), status=200)
			json_response = reset_cookie(request, response, json_response)
			return json_response
		else:
			res = "Request failed\n" + response.text
			return Response({"error": res}, status=response.status_code)

	except requests.exceptions.RequestException as e:
		return Response({"error": str(e)}, status=500)