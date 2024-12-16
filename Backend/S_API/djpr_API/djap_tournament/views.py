import requests
import jwt
import os
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
# from djap_register.models import UserProfile
# from .save_new_user import save_new_user
from rest_framework.permissions import AllowAny
from djpr_API.decorator import jwt_required_2fa

# Create your views here.
@api_view(['POST'])
def selectTournament(request):
	print("selectTournament_view")
	nb = 8
	response = requests.post('http://django-tournament:8000/tournament/selectTournament/')
	return Response({"message": response.text}, status=response.status_code)

