# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    middlewares.py                                     :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/29 09:30:49 by eslamber          #+#    #+#              #
#    Updated: 2024/10/29 12:26:49 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import jwt
import os
from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from rest_framework.exceptions import AuthenticationFailed
from djap_register.models import UserProfile
from jwt.exceptions import InvalidTokenError, DecodeError

class JWTAuthenticationMiddleware(MiddlewareMixin):
	def process_request(self, request):
		# Récupération du cookie contenant le token JWT
		token = request.COOKIES.get('jwt_token')

		print("bonjour")
		if not token:
			request.user = AnonymousUser()
			return

		print("bonjour2")
		try:
			# Décodage du token
			decoded_token = jwt.decode(
				token,
				os.getenv('SECRET_KEY'),
				algorithms=[os.getenv('ALGO')],
				options={"verify_signature": True}
			)
			
			# Récupération des éléments a vérifier pour la validitée du token
			grade = decoded_token.get('grade')
			username = decoded_token.get('username')
			if (grade != '2fa' or not grade or not username):
				raise AuthenticationFailed("Unauthorized token")
			request.username = username

			# Récupération du user_id pour l'identification
			user_id = decoded_token.get('user_id')

			# Charger l'utilisateur associé au token
			user = UserProfile.objects.filter(user_id=user_id).first()

			# Les exceptions sur la gestion du user
			if user is None:
				print("bonjour6")
				request.user = AnonymousUser()
			else:
				request.user = user
			print("bonjour3")

		# Les exceptions sur la gestion du token
		except InvalidTokenError:
			raise AuthenticationFailed("Invalid token")
		except DecodeError:
			raise AuthenticationFailed("Token error")