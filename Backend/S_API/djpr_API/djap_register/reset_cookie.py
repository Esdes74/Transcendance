# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    reset_cookie.py                                    :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/12/06 16:18:19 by eslamber          #+#    #+#              #
#    Updated: 2024/12/06 16:36:55 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import requests
from django.http import JsonResponse

def	reset_cookie(request, response, json_response):
	if (hasattr(request, 'ft') and request.ft):
		key = '42_token'
	else:
		key = 'jwt_token'
	
	token = response.json().get('token')
	json_response.set_cookie(key=key, value=token, httponly=True, samesite='Strict', max_age=3600)
	return json_response