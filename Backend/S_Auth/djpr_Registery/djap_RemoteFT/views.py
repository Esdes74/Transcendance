import os
import requests
import urllib.parse
from django.shortcuts import render
from djap_RemoteFT.models import StateModel
from django.http import JsonResponse
from .log_ft import log_ft
from djap_login.models import FullUser
from requests.exceptions import ConnectionError

def forty_two_auth(request):
	if (request.method == 'POST'):
		send_state = request.POST.get('sendState')

		if not send_state or not isinstance(send_state, str):
			return JsonResponse({"error": "Missing Credentials"}, status=400)
		if (len(send_state) != 50):
			return JsonResponse({"error": "Invald data format"}, status=400)

		save_state = StateModel.objects.create(state=send_state)

		save_state.save()

		server_ip = os.getenv("SERVER_IP")
		external_service_url = "https://api.intra.42.fr/oauth/authorize"
		client_id = os.getenv("UID")
		redirect_uri = urllib.parse.quote("https://" + server_ip + ":3000/auth42callback")
		response_type = "code"
		scope = "public"

		uri = f"https://api.intra.42.fr/oauth/authorize?client_id={client_id}&redirect_uri={redirect_uri}&response_type={response_type}&scope={scope}&state={send_state}"

		return JsonResponse({"message": "Data succesfully created", "uri": uri}, status=201)

def make_token(request):
	if (request.method == 'POST'):
		send_state = request.POST.get('sendState')
		send_code = request.POST.get('sendCode')
		server_ip = os.getenv("SERVER_IP")

		if not send_state or not send_code or not isinstance(send_state, str) or not isinstance(send_code, str):
			return JsonResponse({"error": "Invalid datas"}, status=400)
		if (len(send_state) != 50 or len(send_code) != 64):
			return JsonResponse({"error": "Invalid data format"}, status=400)

		# Take saved state from database
		# If found so it's the same, don't need to check if same
		state = StateModel.objects.filter(state=send_state).first()
		if (state == None):
			return JsonResponse({"error": "Invalid Datas"}, status=401)

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
			'redirect_uri': "https://" + server_ip + ":3000/auth42callback",
			'state': send_state
		}

		try:
			response = requests.post(external_service_url, data=payload)
			state.delete()

			if response.status_code == 200:
				token_data = response.json()
				token = token_data.get("access_token")
				user, token_jwt = log_ft(token)
				if token_jwt and user:
					return JsonResponse({"message": "Token succesfully created", "token": token_jwt, "language": user.language}, status=200)
				else:
					return JsonResponse({"error": "Token not found in response"}, status=502)
			else:
				res = "Token failed\n" + response.text
				return JsonResponse({"error": res}, status=502)

		except ConnectionError as e:
			return JsonResponse({"error": "Failed to connect to external api"}, status=502)
		except requests.exceptions.RequestException as e:
			return JsonResponse({"error": str(e)}, status=500)
