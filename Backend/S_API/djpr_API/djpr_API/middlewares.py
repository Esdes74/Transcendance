# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    middlewares.py                                     :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/29 09:30:49 by eslamber          #+#    #+#              #
#    Updated: 2024/10/30 17:29:33 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

# import jwt
# import os
# from django.http import JsonResponse
# from rest_framework import status
# from django.utils.deprecation import MiddlewareMixin
# from django.conf import settings
# from django.contrib.auth.models import AnonymousUser
# # from django.contrib.auth import get_user_model
# from django.shortcuts import get_object_or_404
# # from rest_framework.exceptions import AuthenticationFailed
# from djap_register.models import UserProfile
# from jwt.exceptions import InvalidTokenError, DecodeError

# class JWTAuthenticationMiddleware(MiddlewareMixin):
# 	def process_request(self, request):
# 		# Récupération du cookie contenant le token JWT
# 		token = request.COOKIES.get('jwt_token')

# 		print("bonjour")
# 		if not token:
# 			request.user = AnonymousUser()
# 			return

# 		try:
# 			# Décodage du token
# 			print("bonjour2")
# 			decoded_token = jwt.decode(
# 				token,
# 				os.getenv('SECRET_KEY'),
# 				algorithms=[os.getenv('ALGO')],
# 				options={"verify_signature": True}
# 			)
			
# 			# Récupération des éléments a vérifier pour la validitée du token
# 			grade = decoded_token.get('grade')
# 			username = decoded_token.get('username')
# 			if (grade != '2fa' or not grade or not username):
# 				print("bonjour3")
# 				return JsonResponse({"detail": "Unauthorized token"}, status=status.HTTP_401_UNAUTHORIZED)
# 			request.username = username

# 			# Récupération du user_id pour l'identification
# 			user_id = decoded_token.get('user_id')

# 			# Charger l'utilisateur associé au token
# 			print("avant get user")
# 			print(user_id)
# 			user_id = int(user_id)
# 			user = get_object_or_404(UserProfile, user_id=user_id)
# 			print("apres get user")

# 			# Les exceptions sur la gestion du user
# 			if user is None:
# 				print("bonjour4")
# 				request.user = AnonymousUser()
# 			else:
# 				print("bonjour5")
# 				request.user = user

# 		# Les exceptions sur la gestion du token
# 		except InvalidTokenError:
# 			print("bonjour6")
# 			return JsonResponse({"detail": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
# 		except DecodeError:
# 			print("bonjour7")
# 			return JsonResponse({"detail": "Token error"}, status=status.HTTP_401_UNAUTHORIZED)
# 		print(f"request.user = {request.user}")

# class DisableCSRFMiddleware(MiddlewareMixin):
# 	def process_request(self, request):
# 		if request.path.startswith('/api/'):  # Remplacez '/api/' par le préfixe de votre API
# 			request._dont_enforce_csrf_checks = True