from django.shortcuts import render

# Create your views here.

from django.shortcuts import render

def pong_view(request):
	return render(request, 'pong.html')  # Assure-toi que 'pong.html' est dans ton répertoire de templates
