# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    models.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/26 10:40:45 by eslamber          #+#    #+#              #
#    Updated: 2024/09/26 10:41:00 by eslamber         ###   ########.fr        #
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