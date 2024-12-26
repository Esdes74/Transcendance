import os
import requests
from django.shortcuts import render
from djap_RemoteFT.models import StateModel
from django.http import HttpResponse, JsonResponse

def stock(request):
	if (request.method == 'POST'):
		send_state = request.POST.get('sendState')

		if not send_state:
			return JsonResponse({"error": "Missing Credentials"}, status=400)
		if (len(send_state) != 50):
			return JsonResponse({"error": "Invald data format"}, status=400)

		save_state = StateModel.objects.create(state=send_state)

		save_state.save()

		return JsonResponse({"message": "Data succesfully created"}, status=201)

def make_token(request):
	if (request.method == 'POST'):
		send_state = request.POST.get('sendState')
		send_code = request.POST.get('sendCode')

		# TODO: Voir si il faut garder ces vérifs ci alors qu'on vérifie déjà la meme chose dans l'api
		if not send_state or not send_code:
			return JsonResponse({"error": "Missing Credentials"}, status=400)
		if (len(send_state) != 50 or len(send_code) != 64):
			return JsonResponse({"error": "Invald data format"}, status=400)

		# Take aved state from database
		# If found so it's the same, don't need to check if same
		state = StateModel.objects.filter(state=send_state).first()
		if (state == None):
			return JsonResponse({"error": "Invalid Credentials"}, status=401)

		uid = os.getenv('UID')
		secret = os.getenv('SECRET')

		if not uid or not secret:
			return JsonResponse({"error": "Server configuration error"}, status=500)

		# Make request to 42's api
		external_service_url = "https://api.intra.42.fr/oauth/token"
		payload = {
			'grant_type': 'authorization_code',
			'client_id': uid,
			'client_secret': secret,
			'code': send_code,
			'redirect_uri': "https://localhost:3000/bravocallback",
			'state': send_state
		}

		try:
			response = requests.post(external_service_url, data=payload)
			# Delete saved state from database
			# TODO: Voir si la state doit etre supprimé systématiquement ou si elle doit etre gardée en cas d'échec
			state.delete()


			if response.status_code == 200:
				token_data = response.json()
				token = token_data.get("access_token")
				if token:
					return JsonResponse({"message": "Token succesfully created", "token": token}, status=200)
				else:
					return JsonResponse({"error": "Token not found in response"}, status=500)
			else:
				res = "Token failed\n" + response.text
				return JsonResponse({"error": res}, status=response.status_code)

		except requests.exceptions.RequestException as e:
			return JsonResponse({"error": str(e)}, status=500)