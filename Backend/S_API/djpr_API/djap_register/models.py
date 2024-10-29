# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    models.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/29 11:14:51 by eslamber          #+#    #+#              #
#    Updated: 2024/10/29 11:48:29 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.db import models

class UserProfile(models.Model):
	user_id = models.PositiveIntegerField(unique=True)

	def __str__(self):
		return f"UserProfile(user_id={self.user_id})"