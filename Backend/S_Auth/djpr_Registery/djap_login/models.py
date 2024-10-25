# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    models.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/04 17:26:29 by eslamber          #+#    #+#              #
#    Updated: 2024/10/23 16:55:51 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.db import models
from django.contrib.auth.models import AbstractUser

# Classe d'authentification custom
class FullUser(AbstractUser):
	pseudo = models.CharField(max_length=25)
	email = models.CharField(blank=True, null=True)
	phone_nb = models.CharField(max_length=10, blank=True, null=True)
	adress = models.CharField(blank=True, null=True)
	secret = models.CharField(max_length=32, blank=True, null=True)