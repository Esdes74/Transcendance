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

		print(f"voici ce qui a été save = {save_state.state}")
		return JsonResponse({"message": "Data succesfully created"}, status=201)