from django.urls import re_path
# from . import views
from . import consumers

# urlpatterns = [
# 	path('launch/', views.launch_view, name='launch') # redirige vers la gestion du login

# ]

websocket_urlpatterns = [
    re_path(r'ws/tournament/$', consumers.TournamentConsumer.as_asgi()),
]
