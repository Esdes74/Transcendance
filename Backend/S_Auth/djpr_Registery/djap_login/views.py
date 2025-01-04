# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    views.py                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/04 17:27:22 by eslamber          #+#    #+#              #
#    Updated: 2024/12/27 14:51:37 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import check_password
from django.db import IntegrityError
from .models import FullUser
from .gen_token import generate_jwt_token_auth, generate_temporary_token
import pyotp

def login(request):
	if (request.method == 'POST') : # TODO: paser en GET
		username = request.POST.get('username')
		password = request.POST.get('password')

		# Regarde si les identifiants sont donnés/recus
		if not username or not password :
			return JsonResponse({"error": "Missings credentials"}, status = 400)

		try:
			# Authentification de l'utilisateurs avec les comptes prééxistans
			user = FullUser.objects.filter(username=username).first()

			# Si n'existe pas
			if user is None:
				return JsonResponse({"error": "Invalid Credentials"}, status=401)

			# Vérifier le mot de passe (en utilisant la fonction Django hash)
			if not check_password(password, user.password):
				return JsonResponse({"error": "Invalid Credentials"}, status=401)

			# Création du secret et ajout dans la base de donnée
			otp_sec = pyotp.random_base32()
			user.secret = otp_sec
			user.save()

			# Génération du token temporaire et renvois
			# TODO: Fonctionnalitee a tester
			if (user.secu):
				token = generate_temporary_token(user)
			else:
				token = generate_jwt_token_auth(user)
			res = "Login Complete"
			return JsonResponse({"message": res, "token": token, "2fa": user.secu, "language": user.language}, status = 200)

		except Exception as e:
			return JsonResponse({"error": "Authentification failed"}, status=500)

def create(request):
	if (request.method == 'POST') :
		username = request.POST.get('username')
		password = request.POST.get('password')
		pseudo = request.POST.get('pseudo')
		phone_nb = request.POST.get('phone_nb')
		mail = request.POST.get('mail')

		# Regarde si les identifiants sont donnés/recus
		if not username or not password or not pseudo or not mail:
			return JsonResponse({"error": "Missings credentials"}, status = 400)

		try:
			# Création du secret du profil
			otp_sec = pyotp.random_base32()

			# Création du profil
			# TODO: voir s'il faut créer un utilisateur temporaire le temps de la double authentification ou non
			user = FullUser.objects.create_user(
				username=username,
				password=password,
				phone_nb=phone_nb,
				email=mail,
				secret=otp_sec
			)
			user.save()

			if user:
				# si le user est bien créé avec on créée le token et on renvois tous
				# Génération du token temporaire et renvois
				token = generate_temporary_token(user)
				res = "Login Complete"
				return JsonResponse({"message": res, "token": token, "2fa": True, "language": "fr"}, status = 201)
			else:
				# si le user n'existe pas alors il y a une erreure et on renvois l'erreure
				return JsonResponse({"error": "User creation failed"}, status=500)

		except IntegrityError as e:
			# Gérer les erreurs comme la violation de contrainte (doublon sur le nom d'utilisateur)
			return JsonResponse({'error': 'Integrity error', 'details': str(e)}, status=400)

		except Exception as e:
			# Gérer d'autres types d'erreurs qui pourraient survenir
			return JsonResponse({'error': 'An unexpected error occurred', 'details': str(e)}, status=500)

	return JsonResponse({'error': 'Invalid request method'}, status=405)

def otp(request):
	if (request.method == 'POST') : # TODO: paser en GET
		username = request.POST.get('username')
		password = request.POST.get('password')

		# Regarde si les identifiants sont donnés/recus
		if not username or not password :
			return JsonResponse({"error": "Missings credentials"}, status = 400)

		try:
			# Authentification de l'utilisateurs avec les comptes prééxistans
			user = FullUser.objects.filter(username=username).first()

			# Si n'existe pas
			if user is None:
				return JsonResponse({"error": "Invalid Token"}, status=401)

			# Récupération du secret de l'utilisateur et vérification du code
			otp_secret = user.secret
			totp = pyotp.TOTP(otp_secret)
			if not totp.verify(password, valid_window=1):
				return JsonResponse({"error": "Invalid Credentials"}, status=401)

			# Génération du token temporaire et renvois
			token = generate_jwt_token_auth(user)
			res = "Login Complete"
			return JsonResponse({"message": res, "token": token, "language": user.language}, status = 200)

		except Exception as e:
			return JsonResponse({"error": "Authentification failed"}, status=500)

def get_me(request):
	if (request.method == 'GET') : # TODO: paser en GET
		username = request.GET.get('username')

		# Regarde si les identifiants sont donnés/recus
		if not username :
			return JsonResponse({"error": "Missings credentials"}, status = 400)

		try:
			# Authentification de l'utilisateurs avec les comptes prééxistans
			user = FullUser.objects.filter(username=username).first()

			# Si n'existe pas
			if user is None:
				return JsonResponse({"error": "Invalid Token"}, status=401)

			# Génération du token temporaire et renvois
			res = "Login Complete"
			real = user.realname
			name = user.username
			mail = user.email
			lang = user.language
			secu = user.secu
			return JsonResponse({"realname": real, "username": name, "email": mail, "language": lang, "secu": secu}, status = 200)

		except Exception as e:
			return JsonResponse({"error": "Request get_me failed"}, status=500)