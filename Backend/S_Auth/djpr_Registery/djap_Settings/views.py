from django.shortcuts import render
from djap_login.models import FullUser
import requests
import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

def delete(request):
	if (request.method == 'DELETE'):
		username = request.DELETE.get('username')

		if not username or not isinstance(username, str):
			return JsonResponse({"error": "Missing datas"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (user == None):
			return JsonResponse({"error": "Invalid datas"}, status=400)

		try:
			user.delete()
			return JsonResponse({}, status=204)
		except IntegrityError as e:
			return JsonResponse({"error": f"Deletion failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

def choose_lang(request):
	if (request.method == 'PUT'):
		data = json.loads(request.body)
		username = data.get('username')
		new_lang = data.get('newLang')

		if not username or not new_lang:
			return JsonResponse({"error": "Missing datas"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (not isinstance(username, str) or not isinstance(new_lang, str)):
			return JsonResponse({"error": "Invalid datas"}, status=400)
		if (user == None):
			return JsonResponse({"error": "Invalid datas"}, status=400)

		try:
			user.language = new_lang
			user.save()
			return JsonResponse({"message": "Language updated successfully"}, status=200)
		except IntegrityError as e:
			return JsonResponse({"error": f"Changement failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

def choose_verif(request):
	if (request.method == 'PUT'):
		data = json.loads(request.body)
		username = data.get('username')
		new_2fa = data.get('new2fa')

		if not username or not isinstance(username, str):
			return JsonResponse({"error": "Missing datas"}, status=400)
		
		if isinstance(new_2fa, str) and (new_2fa.lower() == 'true' or new_2fa.lower() == 'false'):
			new_2fa = new_2fa.lower() == 'true'
		elif isinstance(new_2fa, bool):
			pass
		else:
			return JsonResponse({"error": "Wrong datas"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (user == None):
			return JsonResponse({"error": "Invalid Credentials"}, status=401)

		try:
			user.secu = new_2fa
			user.save()
			return JsonResponse({"message": "Verification updated successfully"}, status=200)

		except IntegrityError as e:
			return JsonResponse({"error": f"Changement failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

def get_lang(request):
	if (request.method == 'GET'):
		username = request.GET.get('username')

		if not username or not isinstance(username, str):
			return JsonResponse({"error": "Missing datas"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (user == None):
			return JsonResponse({"error": "Invalid datas"}, status=400)

		try:
			res = user.language
			return JsonResponse({"message": res}, status=200)
		except IntegrityError as e:
			return JsonResponse({"error": f"Changement failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

def get_verif(request):
	if (request.method == 'GET'):
		username = request.GET.get('username')

		if not username or not isinstance(username, str):
			return JsonResponse({"error": "Missing datas"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (user == None):
			return JsonResponse({"error": "Invalid datas"}, status=400)

		try:
			res = user.secu
			return JsonResponse({"message": res}, status=200)
		except IntegrityError as e:
			return JsonResponse({"error": f"Changement failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)
