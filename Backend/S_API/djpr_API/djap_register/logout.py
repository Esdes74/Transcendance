# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    logout.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslamber@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/12/06 15:51:23 by eslamber          #+#    #+#              #
#    Updated: 2025/01/27 15:56:50 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.http import JsonResponse

# Warning: This function has to be called on a view with auth_required
def logout(request, json_response):
	json_response.delete_cookie('jwt_token')
	return json_response
