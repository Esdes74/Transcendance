from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.hashers import check_password
from django.db import IntegrityError
# import pyotp

# Create your views here.
def selectTournament(request):
	print("selectTournament depuis le service Tournament")
	return JsonResponse({"message": "hello", "number": 8}, status=200)
