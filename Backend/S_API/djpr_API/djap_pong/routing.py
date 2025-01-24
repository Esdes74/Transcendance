# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    routing.py                                         :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: tdutel <tdutel@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/06 10:42:22 by eslamber          #+#    #+#              #
#    Updated: 2025/01/24 03:35:01 by lmohin           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.urls import re_path
# from . import views
from . import consumers

# urlpatterns = [
# 	path('launch/', views.launch_view, name='launch') # redirige vers la gestion du login

# ]

websocket_urlpatterns = [
    re_path(r'ws/pong/$', consumers.PongConsumer.as_asgi()),
    re_path(r'ws/pong/ai', consumers.PongConsumer.as_asgi()),
    re_path(r'ws/pong/ai/easy', consumers.PongConsumer.as_asgi()),
    re_path(r'ws/pong/ai/medium', consumers.PongConsumer.as_asgi()),
    re_path(r'ws/pong/ai/hard', consumers.PongConsumer.as_asgi())
]
