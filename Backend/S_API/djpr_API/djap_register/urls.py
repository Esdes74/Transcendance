# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    urls.py                                            :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/06 10:42:22 by eslamber          #+#    #+#              #
#    Updated: 2024/12/04 09:52:42 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.urls import path
from . import views

urlpatterns = [
	path('login/', views.login_view, name='login'), # redirige vers la gestion du login
	path('create/', views.create_view, name='create'), # redirige vers la gestion du login
	path('2fa/', views.otp_verif, name='verif'), # redirige vers la gestion du 2fa
	path('stock/', views.stock, name='stock_state'), # redirige vers le stockage de state pour les requetes a l'api 42
	path('make_token/', views.make_token, name='make_token'), # redirige vers la récupération du token pour les requetes a l'api 42
]