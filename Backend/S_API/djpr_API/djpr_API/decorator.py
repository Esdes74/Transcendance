# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    decorator.py                                       :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/30 17:01:00 by eslamber          #+#    #+#              #
#    Updated: 2025/01/23 18:39:26 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import jwt
import os
from functools import wraps
from django.http import JsonResponse
from django.contrib.auth.models import AnonymousUser
from django.shortcuts import get_object_or_404
from djap_register.models import UserProfile
from jwt.exceptions import InvalidTokenError, DecodeError
from djap_register.models import FtTokenModel
from djap_register.logout import logout
from django.http import Http404

def jwt_required_2fa(view_func):
	@wraps(view_func)
	def _wrapped_2fa(request, *args, **kwargs):
		# Récupération du token JWT depuis les en-têtes HTTP
		# print(request.COOKIES)
		# auth_header = request.headers.get('Authorization')
		# if auth_header and auth_header.startswith('Bearer '):
		# 	token = auth_header.split(' ')[1]
		# else:
		# 	# Récupérer le token depuis le cookie si Authorization est absent
		token = request.COOKIES.get('tfa_jwt_token')

		if not token:
			return JsonResponse({"error": "Unauthorized"}, status=401)

		try:
			# Décodage du token
			decoded_token = jwt.decode(
				token,
				os.getenv('SECRET_KEY'),
				algorithms=[os.getenv('ALGO')],
				options={"verify_signature": True}
			)

			# Vérification des éléments du token
			grade = decoded_token.get('grade')
			username = decoded_token.get('username')
			user_id = decoded_token.get('user_id')

			if not grade or grade != '2fa' or not username or not user_id:
				return JsonResponse({"error": "Unauthorized token"}, status=401)

			# Charger l'utilisateur associé au token
			user = get_object_or_404(UserProfile, user_id=int(user_id))

			# Assigner les informations à la requête
			# request.user = user # Retiree car provoque une erreure avec csrf
			request.username = username

		except (InvalidTokenError, DecodeError):
			return JsonResponse({"error": "Invalid or corrupted token"}, status=401)

		# Appeler la vue d'origine
		return view_func(request, *args, **kwargs)

	return _wrapped_2fa

# def jwt_required_2fa(view_func):
# 	@wraps(view_func)
# 	def _wrapped_2fa(request, *args, **kwargs):
# 		# Récupération du cookie contenant le token JWT
# 		token = request.COOKIES.get('jwt_token')

# 		if not token:
# 			request.user = AnonymousUser()
# 			return JsonResponse({"error": "Unauthorized"}, status=401)

# 		try:
# 			# Décodage du token
# 			decoded_token = jwt.decode(
# 				token,
# 				os.getenv('SECRET_KEY'),
# 				algorithms=[os.getenv('ALGO')],
# 				options={"verify_signature": True}
# 			)

# 			# Récupération des éléments à vérifier pour la validité du token
# 			grade = decoded_token.get('grade')
# 			username = decoded_token.get('username')
# 			if (grade != '2fa' or not grade or not username):
# 				return JsonResponse({"error": "Unauthorized token"}, status=401)

# 			request.username = username

# 			# Récupération du user_id pour l'identification
# 			user_id = decoded_token.get('user_id')
# 			user_id = int(user_id)

# 			# Charger l'utilisateur associé au token
# 			user = get_object_or_404(UserProfile, user_id=user_id)

# 			# Assigner l'utilisateur à la requête
# 			request.user = user

# 		except InvalidTokenError:
# 			return JsonResponse({"error": "Invalid token"}, status=401)
# 		except DecodeError:
# 			return JsonResponse({"error": "Token error"}, status=401)

# 		# Appeler la vue d'origine
# 		return view_func(request, *args, **kwargs)

# 	return _wrapped_2fa

def auth_required(view_func):
	@wraps(view_func)
	def _wrapped_auth(request, *args, **kwargs):
		# Récupération du cookie contenant le token JWT
		token = request.COOKIES.get('jwt_token')
		request.ft = False
		request.token = None
		request.username = None
		# request.user = None

		if not token:
			token = request.COOKIES.get('42_token')
			if not token:
				# request.user = AnonymousUser()
				return JsonResponse({"error": "Unauthorized"}, status=401)

			saved_token = FtTokenModel.objects.filter(token=token).first()
			if (state == None):
				return JsonResponse({"error": "Invalid Credentials"}, status=401)

			request.ft = True
			request.token = saved_token

			# Appeler la vue d'origine
			return view_func(request, *args, **kwargs)

		try:
			# Décodage du token
			decoded_token = jwt.decode(
				token,
				os.getenv('SECRET_KEY'),
				algorithms=[os.getenv('ALGO')],
				options={"verify_signature": True}
			)

			# Récupération des éléments à vérifier pour la validité du token
			grade = decoded_token.get('grade')
			username = decoded_token.get('username')
			if (grade != 'auth' or not grade or not username):
				return JsonResponse({"error": "Unauthorized token"}, status=401)

			# Récupération du user_id pour l'identification
			user_id = decoded_token.get('user_id')
			user_id = int(user_id)

			# Charger l'utilisateur associé au token
			# TODO: changer la facon de faire pour avoir plus la main dessus
			user = get_object_or_404(UserProfile, user_id=user_id)

			request.username = username

			# Assigner l'utilisateur à la requête
			# request.user = user

		except InvalidTokenError:
			return JsonResponse({"error": "Invalid token"}, status=401)
		except Http404:
			json_response = JsonResponse({"error": "Not Found"}, status=404)
			json_response = logout(request, json_response)
			return json_response
		except DecodeError:
			return JsonResponse({"error": "Token error"}, status=401)

		# Appeler la vue d'origine
		return view_func(request, *args, **kwargs)

	return _wrapped_auth

def no_token_requiered(view_func):
	@wraps(view_func)
	def _wrapped_no_token(request, *args, **kwargs):
		print("hello")
		# Récupération du cookie contenant le token JWT
		token_jwt = request.COOKIES.get('jwt_token')
		token_ft = request.COOKIES.get('42_token')

		if token_jwt or token_ft:
			# request.user = AnonymousUser()
			return JsonResponse({"error": "Unauthorized"}, status=401)

		print("appeler la vue d'origine")
		# Appeler la vue d'origine
		return view_func(request, *args, **kwargs)

	return _wrapped_no_token

def no_jwt_token_requiered(view_func):
	@wraps(view_func)
	def _wrapped_no_jwt_token(request, *args, **kwargs):
		# Récupération du cookie contenant le token JWT
		token_jwt = request.COOKIES.get('jwt_token')

		if token_jwt:
			# request.user = AnonymousUser()
			return JsonResponse({"error": "Unauthorized"}, status=401)

		# Appeler la vue d'origine
		return view_func(request, *args, **kwargs)

	return _wrapped_no_jwt_token

def no_ft_token_requiered(view_func):
	@wraps(view_func)
	def _wrapped_no_ft_token(request, *args, **kwargs):
		# Récupération du cookie contenant le token JWT
		token_ft = request.COOKIES.get('42_token')

		if token_ft:
			# request.user = AnonymousUser()
			return JsonResponse({"error": "Unauthorized"}, status=401)

		# Appeler la vue d'origine
		return view_func(request, *args, **kwargs)

	return _wrapped_no_ft_token