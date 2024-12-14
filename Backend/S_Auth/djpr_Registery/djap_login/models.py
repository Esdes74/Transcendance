# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    models.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/04 17:26:29 by eslamber          #+#    #+#              #
#    Updated: 2024/12/14 15:37:46 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField

# Classe d'authentification custom
class FullUser(AbstractUser):
	pseudo = models.CharField(max_length=25)
	email = models.EmailField(blank=True, null=True)
	phone_nb = PhoneNumberField(blank=True, null=True)
	secret = models.CharField(max_length=32, blank=True, null=True)
	language = models.CharField(max_length=2, blank=False, null=False, default='fr')
	secu = models.BooleanField(default=True)