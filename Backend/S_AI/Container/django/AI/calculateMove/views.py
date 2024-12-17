from django.shortcuts import render
from django.http import JsonResponse

def multiplicate(request):
	try:
		a = int(request.GET.get('a'))
		b = int(request.GET.get('b'))

		result = a * b

		return JsonResponse({"result": result})
	
	except (ValueError, TypeError):
		return JsonResponse({"error": "Invalid input"}, status=400)


# Create your views here.
