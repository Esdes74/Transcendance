from django.urls import path
from . import views

urlpatterns = [
	path('initDB/', views.initDB, name='initDB'), # redirige vers la gestion du deletePlayer
	path('selectTournament/', views.selectTournament, name='selectTournament'), # redirige vers la gestion du selcetion de tournoi
	path('createPlayer/', views.createPlayer, name='createPlayer'), # redirige vers la gestion du createPlayer
	path('deletePlayer/', views.deletePlayer, name='deletePlayer'), # redirige vers la gestion du deletePlayer
]
