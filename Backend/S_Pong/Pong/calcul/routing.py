from django.urls import re_path
from . import views
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/pong/calcul', consumers.CalculConsumer.as_asgi()),
]
