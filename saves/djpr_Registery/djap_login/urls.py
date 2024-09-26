# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    urls.py                                            :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/26 10:41:32 by eslamber          #+#    #+#              #
#    Updated: 2024/09/26 10:44:47 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.urls import path
from . import views

urlpatterns = [
	path('register/', views.register, name="login_auth"),
	path('create/', views.create, name="profile_creation"),
]
