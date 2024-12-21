from django.urls import path
from . import views

urlpatterns = [
	path('initDB/', views.initDB, name='initDB'), # redirige vers la gestion du deletePlayer
	path('selectTournament/', views.selectTournament, name='selectTournament'), # redirige vers la gestion du selcetion de tournoi
	path('createPlayer/', views.createPlayer, name='createPlayer'), # redirige vers la gestion du createPlayer
	path('deletePlayer/', views.deletePlayer, name='deletePlayer'), # redirige vers la gestion du deletePlayer
	path('validTournament/', views.validTournament, name='validTournament'), # redirige vers la gestion du validTournament
	path('startTournament/', views.startTournament, name='startTournament'), # redirige vers la gestion du startTournament
	# path('startGame/', views.startGame, name='startGame'), # redirige vers la gestion du startGame
	path('endGame/', views.endGame, name='endGame'), # redirige vers la gestion du endGame
]
