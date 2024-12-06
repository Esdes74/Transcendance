from django.shortcuts import render
from djap_login.models import FullUser
import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse

# TODO: A tester
def delete(request):
	if (request.method == 'POST'):
		username = request.POST.get('username')

		if not username:
			return JsonResponse({"error": "Missing credentials"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (user == None):
			return JsonResponse({"error": "Invalid Credentials"}, status=401)

		try:
			user.delete()
			return JsonResponse({}, status=204)
		except IntegrityError as e:
			return JsonResponse({"error": f"Deletion failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

# TODO: A tester
def choose_lang(request):
	if (request.method == 'POST'):
		username = request.POST.get('username')
		new_lang = request.POST.get('newLang')

		if not username or not new_lang:
			return JsonResponse({"error": "Missing credentials"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (user == None):
			return JsonResponse({"error": "Invalid Credentials"}, status=401)

		try:
			user.language = new_lang
			user.save()
			return JsonResponse({"message": "Language update success"}, status=200)
		except IntegrityError as e:
			return JsonResponse({"error": f"Changement failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

# TODO: A tester
def choose_verif(request):
	if (request.method == 'POST'):
		username = request.POST.get('username')
		new_2fa = request.POST.get('new2fa')

		if not username or not new_2fa:
			return JsonResponse({"error": "Missing credentials"}, status=400)
		
		if isinstance(new_2fa, str) and (new_2fa.lower() == 'true' or new_2fa.lower() == 'false'):
			new_2fa = new_2fa.lower() == 'true'
		elif isinstance(new_2fa, bool):
			pass
		else:
			return JsonResponse({"error": "Wrong credentials"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (user == None):
			return JsonResponse({"error": "Invalid Credentials"}, status=401)

		try:
			user.secu = new_2fa
			user.save()
			return JsonResponse({"message": "Verification update success"}, status=200)
		except IntegrityError as e:
			return JsonResponse({"error": f"Changement failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

# TODO: A tester
def get_lang(request):
	if (request.method == 'GET'):
		username = request.GET.get('username')

		if not username:
			return JsonResponse({"error": "Missing credentials"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (user == None):
			return JsonResponse({"error": "Invalid Credentials"}, status=401)

		try:
			res = user.language
			return JsonResponse({"message": res}, status=200)
		except IntegrityError as e:
			return JsonResponse({"error": f"Changement failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)

# TODO: A tester
def get_verif(request):
	if (request.method == 'GET'):
		username = request.GET.get('username')

		if not username:
			return JsonResponse({"error": "Missing credentials"}, status=400)

		user = FullUser.objects.filter(username=username).first()
		if (user == None):
			return JsonResponse({"error": "Invalid Credentials"}, status=401)

		try:
			res = user.secu
			return JsonResponse({"message": res}, status=200)
		except IntegrityError as e:
			return JsonResponse({"error": f"Changement failed: {str(e)}"}, status=400)
		except Exception as e:
			return JsonResponse({"error": f"Unexpected error: {str(e)}"}, status=500)