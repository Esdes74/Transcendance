# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    gen_token.py                                       :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/20 17:14:17 by eslamber          #+#    #+#              #
#    Updated: 2025/01/26 17:17:52 by lmohin           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import jwt
import datetime
import pyotp
import os
from django.conf import settings
from django.core.mail import send_mail

# Rajouter ici les infos qu'on veut partager entre tous les services et donc a ajouter dans le token
# ATTENTION : ces infos ne sont pas des infos qui peuvent bouger toutes les 5mins (donc pas les scores par exemple)
# ATTENTION 2 : ne pas mettre d'infos sensibles comme les mdp car peuvent etre exposé (email non plus d'ailleur
# on ne veut pas que l'utilisateur puisse se faire harceler)
def generate_jwt_token_auth(user):
	# recuperation des clees secretes
	secret_key = settings.SECRET_KEY
	algo = settings.ALGO

	payload = {
		'user_id': user.id,
		'username': user.username,
		'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
		'iat': datetime.datetime.utcnow(),
		'grade': 'auth',
	}

	# Génération du token
	token = jwt.encode(payload, secret_key, algorithm=algo)
	return token

def generate_temporary_token(user):
	# recuperation des clees secretes
	secret_key = settings.SECRET_KEY
	algo = settings.ALGO

	payload = {
		'user_id': user.id,
		'username': user.username,
		'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=3),
		'iat': datetime.datetime.utcnow(),
		'grade': '2fa',
	}

	# Génération du token
	token = jwt.encode(payload, secret_key, algorithm=algo)

	# Génération du mot de passe temporaire envoyé
	otp_secret = user.secret
	totp = pyotp.TOTP(otp_secret)
	otp_code = totp.now()

	# Envois du mot de passe par e-mail
	send_mail(
		subject='2fa password',
		message=f'Here is your 2fa password\nYou have less than 3 minutes to use this password\n{otp_code}',
		from_email=os.getenv('EMAIL_HOST_USER'),
		recipient_list=[user.email],
		fail_silently=False,
	)

	return token
