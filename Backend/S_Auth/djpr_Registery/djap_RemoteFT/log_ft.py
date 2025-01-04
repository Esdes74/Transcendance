# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    log_ft.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/12/26 16:50:18 by eslamber          #+#    #+#              #
#    Updated: 2024/12/27 15:43:11 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import random
import string
import requests
from django.http import JsonResponse
from djap_login.models import FullUser
from djap_login.gen_token import generate_jwt_token_auth

def log_ft(token):
	# Make request to 42's api
	external_service_url = "https://api.intra.42.fr/v2/me"
	headers = {
		'Authorization': f"Bearer {token}"
	}

	try:
		response = requests.get(external_service_url, headers=headers)
		# Delete saved state from database
		# TODO: Voir si la state doit etre supprimé systématiquement ou si elle doit etre gardée en cas d'échec

		if response.status_code == 200:
			data = response.json()
			user = create_ft_user(data)
			if user == None:
				return None, None
			else:
				token_jwt = generate_jwt_token_auth(user)
				return user, token_jwt
		else:
			error = "Token failed\n" + response.text
			return None, None

	except requests.exceptions.RequestException as e:
		return None, None

def create_ft_user(data):
	# Recherche d'un utilisateur ayant déjà ce realname
	# si personne on regarde si username déjà pris
		# si oui alors on en créer un nouveau
		# si non alors on créer avec realname et username identiques
	# si trouvé alors on le login a celui ci

	# Récupération des données nécessaire pour la création du profil
	username = data['login']
	password = " "
	pseudo = data['login']
	phone_nb = data['phone']
	email = data['email']

	# Vérification de la récupération des données
	if not username or not pseudo or not phone_nb or not email:
		return None

	user = FullUser.objects.filter(realname=username).first()

	# Si il en existe un
	if user:
		return user

	# Recherche pour savoir si le username est déjà pris
	user = FullUser.objects.filter(username=username).first()
	# Si existe alors on doit en créer un nouveau
	if user:
		generated_username = generate_new_username(username)

		# Vérification que le username créée est unique
		while FullUser.objects.filter(username=generated_username).first() != None:
			generated_username = generate_new_username(username)
	else:
		generated_username = username

	# Création du profil
	# TODO: voir s'il faut créer un utilisateur temporaire le temps de la double authentification ou non
	user = FullUser.objects.create_user(
		realname=username,
		username=generated_username,
		password=password,
		phone_nb=phone_nb,
		email=email
	)
	user.save()
	return user

def generate_new_username(username):
	length = 10
	characters = string.ascii_letters + string.digits  # Lettres majuscules, minuscules et chiffres
	return username + ''.join(random.choices(characters, k=length))