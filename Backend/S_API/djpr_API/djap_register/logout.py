# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    logout.py                                          :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: eslamber <eslambert@student.42lyon.fr>     +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/12/06 15:51:23 by eslamber          #+#    #+#              #
#    Updated: 2024/12/06 17:23:15 by eslamber         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.http import JsonResponse

# Warning: This function has to be called on a view with auth_required
def logout(request, json_response):
	if (hasattr(request, 'ft') and request.ft):
		json_response.delete_cookie('42_token')
		return json_response
	json_response.delete_cookie('jwt_token')
	return json_response