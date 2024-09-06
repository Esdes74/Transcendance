# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    urls.py                                            :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42lyon.fr>      +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/06 10:42:22 by eslamber          #+#    #+#              #
#    Updated: 2024/09/06 15:29:06 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.urls import path
from . import views

urlpatterns = [
	path('login/', views.login_view, name='login') # redirigie vers la gestion du login
]