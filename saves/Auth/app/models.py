# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    models.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: este <este@student.42.fr>                  +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/18 14:41:17 by este              #+#    #+#              #
#    Updated: 2024/09/18 15:03:47 by este             ###   ########.fr        #
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