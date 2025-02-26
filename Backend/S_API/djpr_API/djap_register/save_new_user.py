# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    save_new_user.py                                   :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/29 11:20:20 by eslamber          #+#    #+#              #
#    Updated: 2024/10/30 18:17:30 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import os
import jwt
from django.db import IntegrityError
from djap_register.models import UserProfile

# Stockage du user_id dans la base de données pour les futures connexions
def save_new_user(token):
	decoded_token = jwt.decode(
		token,
		os.getenv('SECRET_KEY'),
		algorithms=[os.getenv('ALGO')],
		options={"verify_signature": True}
	)

	u_id = decoded_token.get('user_id')

	# Vérifiez que u_id est valide
	if u_id is not None:
		try:
			# Vérifiez d'abord si l'utilisateur existe
			if UserProfile.objects.filter(user_id=u_id).exists():
				print(f"L'utilisateur avec user_id: {u_id} existe déjà.")
			else:
				user = UserProfile.objects.create(user_id=u_id)
				user.save()
				print(f"Nouvel utilisateur créé avec user_id: {u_id}")
		except IntegrityError:
			print(f"Une erreur d'intégrité s'est produite pour user_id: {u_id}.")