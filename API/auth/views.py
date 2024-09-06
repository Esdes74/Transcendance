from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Missing credentials"}, status=400)

    # Appeler un autre service pour gérer l'authentification
    external_service_url = "http://django_auth:8000/auth/login/"
    payload = {
        'username': username,
        'password': password
    }

    try:
        response = requests.post(external_service_url, json=payload)
        # Vérifier si la requête a réussi
        if response.status_code == 200:
            return Response(response.json(), status=200)
        else:
            return Response({"error": "Login failed"}, status=response.status_code)

    except requests.exceptions.RequestException as e:
        return Response({"error": str(e)}, status=500)
