# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    decorator.py                                       :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/30 17:01:00 by eslamber          #+#    #+#              #
#    Updated: 2024/10/30 17:57:22 by eslamber         ###   ########.fr        #
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

def jwt_required_2fa(view_func):
	@wraps(view_func)
	def _wrapped_view(request, *args, **kwargs):
		# Récupération du cookie contenant le token JWT
		token = request.COOKIES.get('jwt_token')

		if not token:
			request.user = AnonymousUser()
			return JsonResponse({"detail": "Unauthorized"}, status=401)

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
			if (grade != '2fa' or not grade or not username):
				print(grade)
				print(username)
				return JsonResponse({"detail": "Unauthorized token"}, status=401)

			request.username = username

			# Récupération du user_id pour l'identification
			user_id = decoded_token.get('user_id')
			user_id = int(user_id)

			# Charger l'utilisateur associé au token
			user = get_object_or_404(UserProfile, user_id=user_id)

			# Assigner l'utilisateur à la requête
			request.user = user

		except InvalidTokenError:
			return JsonResponse({"detail": "Invalid token"}, status=401)
		except DecodeError:
			return JsonResponse({"detail": "Token error"}, status=401)

		# Appeler la vue d'origine
		return view_func(request, *args, **kwargs)

	return _wrapped_view
