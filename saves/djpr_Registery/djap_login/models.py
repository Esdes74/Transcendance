# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    models.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/26 10:40:45 by eslamber          #+#    #+#              #
#    Updated: 2024/09/26 12:54:51 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.db import models
from django.contrib.auth.models import AbstractUser

# Classe d'authentification custom
class FullUser(AbstractUser):
	pseudo = models.CharField(max_length=25)
	email = models.CharField(max_length=150, blank=True, null=True)
	phone_nb = models.CharField(max_length=10, blank=True, null=True)
	adress = models.CharField(max_length=250, blank=True, null=True)