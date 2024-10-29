# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    save_new_user.py                                   :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/29 11:20:20 by eslamber          #+#    #+#              #
#    Updated: 2024/10/29 12:08:57 by eslamber         ###   ########.fr        #
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
			user, created = UserProfile.objects.get_or_create(user_id=u_id)
			if created:
				print(f"Nouvel utilisateur créé avec user_id: {u_id}")
			else:
				print(f"L'utilisateur avec user_id: {u_id} existe déjà.")
		except IntegrityError:
			print(f"Une erreur d'intégrité s'est produite pour user_id: {u_id}.")


# import os
# import jwt
# from djap_register.models import UserProfile
# from django.db import IntegrityError

# # Stockage du user_id dans la base de donnée pour les futures connections
# def	save_new_user(token):
# 	decoded_token = jwt.decode(
# 		token,
# 		os.getenv('SECRET_KEY'),
# 		algorithms=[os.getenv('ALGO')],
# 		options={"verify_signature": True}
# 	)

# 	u_id = decoded_token.get('user_id')

# 	if u_id is not None:
# 		try:
# 			new_user = UserProfile.objects.create(user_id=u_id)
# 			new_user.save()
# 		except IntegrityError:
# 			print(f"User with user_id {u_id} or username {username} already exists.")
# 	else:
# 		raise ValueError("Les informations nécessaires n'ont pas été trouvées dans le token.")