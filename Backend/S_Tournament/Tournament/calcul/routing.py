from django.urls import re_path
from . import views
from . import consumers

websocket_urlpatterns_tournament = [
    re_path(r'ws/Tournament/calcul', consumers.CalculConsumer.as_asgi()),
]
