from django.shortcuts import render

# Create your views here.

def pong_view(request):
	return render(request, 'pong_app/pong.html')
