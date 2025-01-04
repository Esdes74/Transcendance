# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    reset_cookie.py                                    :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/12/06 16:18:19 by eslamber          #+#    #+#              #
#    Updated: 2024/12/14 14:59:14 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

import requests
from django.http import JsonResponse

def	reset_cookie(request, json_response):
	if (hasattr(request, 'ft') and request.ft):
		key = '42_token'
		token = request.COOKIES.get('42_token')
	else:
		token = request.COOKIES.get('jwt_token')
		key = 'jwt_token'

	json_response.set_cookie(key=key, value=token, httponly=True, samesite='Strict', max_age=3600)
	return json_response