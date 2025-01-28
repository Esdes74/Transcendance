# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    urls.py                                            :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/06 10:42:22 by eslamber          #+#    #+#              #
#    Updated: 2025/01/16 20:22:55 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.urls import path
from . import views

urlpatterns = [
	path('login/', views.login_view, name='login'),
	path('create/', views.create_view, name='create'),
	path('2fa/', views.otp_verif, name='verif'),
	path('logout/', views.logout_view, name='logout'),
	path('delete/', views.delete, name='delete'),
	path('choose_lang/', views.choose_lang, name='choose_lang'),
	path('choose_verif/', views.choose_verif, name='choose_verif'),
	path('get_lang/', views.get_lang, name='get_lang'),
	path('get_verif/', views.get_verif, name='get_verif'),
	path('forty_two_auth/', views.forty_two_auth, name='stock_state'),
	path('make_token/', views.make_token, name='make_token'),
	path('get_me/', views.get_me, name='get_me'),
	path('is_logged/', views.is_logged, name='is_logged'),
	path('refresh_2fa/', views.refresh_2fa, name='refresh_2fa'),
]