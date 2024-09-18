# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    urls.py                                            :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: este <este@student.42.fr>                  +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/06 10:42:22 by eslamber          #+#    #+#              #
#    Updated: 2024/09/18 18:59:40 by este             ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.urls import path
from . import views

urlpatterns = [
	path('login/', views.login_view, name='login'), # redirige vers la gestion du login
	path('create/', views.create_view, name='create'), # redirige vers la gestion du login
]