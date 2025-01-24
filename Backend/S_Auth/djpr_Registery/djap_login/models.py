# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    models.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/04 17:26:29 by eslamber          #+#    #+#              #
#    Updated: 2025/01/24 12:47:48 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.db import models
from django.contrib.auth.models import AbstractUser

# Classe d'authentification custom
class FullUser(AbstractUser):
	realname = models.CharField(max_length=25, default=None, null=True)
	email = models.EmailField(blank=True, null=True)
	secret = models.CharField(max_length=32, blank=True, null=True)
	language = models.CharField(max_length=2, blank=False, null=False, default='fr')
	secu = models.BooleanField(default=True)
	verified = models.BooleanField(default=False)
	creation = models.DateTimeField(auto_now_add=True)