# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    gen_token.py                                       :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/20 17:14:17 by eslamber          #+#    #+#              #
#    Updated: 2024/09/20 17:14:35 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import jwt
import datetime
from django.conf import settings

# Clé secrète utilisée pour signer le token (assure-toi de l'avoir dans tes settings)
SECRET_KEY = settings.SECRET_KEY
ALGO = settings.ALGO

# Rajouter ici les infos qu'on veut partager entre tous les services et donc a ajouter dans le token
# ATTENTION : ces infos ne sont pas des infos qui peuvent bouger toutes les 5mins (donc pas les scores par exemple)
# ATTENTION 2 : ne pas mettre d'infos sensibles comme les mdp car peuvent etre exposé (email non plus d'ailleur
# on ne veut pas que l'utilisateur puisse se faire harceler)
def generate_jwt_token(user):
	payload = {
		'user_id': user.id,
		'username': user.username,
		'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),  # Expiration dans une heure
		'iat': datetime.datetime.utcnow(),
	}

	token = jwt.encode(payload, SECRET_KEY, algorithm=ALGO)
	return token