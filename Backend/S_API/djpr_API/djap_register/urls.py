# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    urls.py                                            :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/06 10:42:22 by eslamber          #+#    #+#              #
#    Updated: 2024/12/06 16:39:56 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.urls import path
from . import views

urlpatterns = [
	path('login/', views.login_view, name='login'), # redirige vers la gestion du login
	path('create/', views.create_view, name='create'), # redirige vers la gestion du login
	path('2fa/', views.otp_verif, name='verif'), # redirige vers la gestion du 2fa
	path('logout/', views.logout_view, name='logout'), # redirige vers la déconnexion
	path('delete/', views.delete, name='delete'), # redirige vers la suppresssion du compte
	path('choose_lang/', views.choose_lang, name='choose_lang'), # redirige vers le choix de la langue
	path('choose_verif/', views.choose_verif, name='choose_verif'), # redirige vers la mise en place du 2fa
	path('get_lang/', views.get_lang, name='get_lang'), # renvois la valeur de la langue choisie
	path('get_verif/', views.get_verif, name='get_verif'), # renvois la valeur de la vérification choisie
	path('stock/', views.stock, name='stock_state'), # redirige vers le stockage de state pour les requetes a l'api 42
	path('make_token/', views.make_token, name='make_token'), # redirige vers la récupération du token pour les requetes a l'api 42
]