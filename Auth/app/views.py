from django.shortcuts import render
from django.http import HttpResponse


def login(request):
	print("bonjour") # Ajout pour debuggage
	print(request.method) # Ajout pour debuggage
	if (request.method == 'POST') :
		username = request.POST.get('username')
		password = request.POST.get('password')

		if not username or not password :
			return JsonResponse({"error": "Missings credentials"}, status = 400)

		res = "Login Complete with " + username + " and " + password
		return JsonResponse({"message": res}, status = 200)
