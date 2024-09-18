# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    views.py                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: este <este@student.42.fr>                  +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/13 10:52:53 by este              #+#    #+#              #
#    Updated: 2024/09/18 19:38:23 by este             ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from .models import FullUser
from .gen_token import generate_jwt_token

def login(request):
	print("bonjour")
	if (request.method == 'POST') : # TODO: paser en GET
		username = request.POST.get('username')
		password = request.POST.get('password')

		# Regarde si les identifiants sont donnés/recus
		if not username or not password :
			print(f"username = {request.body}, et pass = {password}")
			return JsonResponse({"error": "Missings credentials"}, status = 400)

		# Authentification de l'utilisateurs avec les comptes prééxistans
		user = authenticate(request, username=username, password=password)

		# Si n'existe pas
		if user is None:
			return JsonResponse({"error": "Invalid Credentials"}, status=400)

		token = generate_jwt_token(user)
		res = "Login Complete with " + username + " and " + password
		print("complete")
		return JsonResponse({"message": res, "token": token}, status = 200)

def create(request):
	if (request.method == 'POST') :
		username = request.POST.get('username')
		password = request.POST.get('password')
		pseudo = request.POST.get('pseudo')
		phone_nb = request.POST.get('phone_nb')
		mail = request.POST.get('mail')
		adress = request.POST.get('adress')

		# Regarde si les identifiants sont donnés/recus
		if not username or not password or not pseudo :
			print(f"username = {request.body}, et pass = {password}")
			return JsonResponse({"error": "Missings credentials"}, status = 400)

		try:
			# Création du profil
			user = FullUser.objects.create_user(
				username=username,
				password=password,
				pseudo=pseudo,
				phone_nb=phone_nb,
				email=mail,
				adress=adress
			)

			if user:
				# si le user est bien créé avec on créée le token et on renvois tous
				token = generate_jwt_token(user)
				res = "Login Complete with " + username + " and " + password
				print("complete")
				return JsonResponse({"message": res, "token": token}, status = 201)
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