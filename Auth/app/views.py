# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    views.py                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: este <este@student.42.fr>                  +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2024/09/13 10:52:53 by este              #+#    #+#              #
#    Updated: 2024/09/13 11:00:04 by este             ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def login(request):
	if (request.method == 'POST') :
		username = request.POST.get('username')
		password = request.POST.get('password')

		if not username or not password :
			print(f"username = {request.body}, et pass = {password}")
			return JsonResponse({"error": "Missings credentials"}, status = 400)

		res = "Login Complete with " + username + " and " + password
		return JsonResponse({"message": res}, status = 200)
