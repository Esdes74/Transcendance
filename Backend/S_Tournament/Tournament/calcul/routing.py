from django.urls import path
from . import views
from . import consumers

websocket_urlpatterns = [
	path('ws/tournament/calcul', consumers.TournamentCaluclConsumer.as_asgi()),
]
