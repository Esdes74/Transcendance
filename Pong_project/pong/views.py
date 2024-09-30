from django.http import HttpResponse
from django.conf import settings
import os

def pong_view(request):
	file_path = os.path.join(settings.FRONT_FILES_DIR, 'pong.html')
	with open(file_path, 'r') as f:
		return HttpResponse(f.read())
