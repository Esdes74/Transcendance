# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    models.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/10/29 11:14:51 by eslamber          #+#    #+#              #
#    Updated: 2024/10/29 19:34:28 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models

class UserProfileManager(BaseUserManager):
    def create_user(self, user_id, password=None, **extra_fields):
        if not user_id:
            raise ValueError("The user_id field is required")
        user = self.model(user_id=user_id, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, user_id, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(user_id, password, **extra_fields)

class UserProfile(AbstractBaseUser, PermissionsMixin):
    user_id = models.CharField(max_length=255, unique=True)
    
    # Champs additionnels optionnels
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserProfileManager()

    USERNAME_FIELD = 'user_id'  # Utilisez user_id comme identifiant unique
    REQUIRED_FIELDS = []  # Ajoutez ici les champs obligatoires, s'il y en a

    def __str__(self):
        return f"UserProfile(user_id={self.user_id})"
