# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    models.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/04 17:26:29 by eslamber          #+#    #+#              #
#    Updated: 2025/01/27 15:12:59 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator

class FullUser(AbstractUser):
	realname = models.CharField(max_length=25, default=None, null=True)
	email = models.EmailField(validators=[EmailValidator()], blank=False, null=False)
	secret = models.CharField(max_length=32, blank=True, null=True)
	language = models.CharField(max_length=2, blank=False, null=False, default='fr')
	secu = models.BooleanField(default=True, blank=False, null=False)
	verified = models.BooleanField(default=False)