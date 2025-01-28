from django.urls import path
from . import views

urlpatterns = [
	path('initDB/', views.initDB, name='initDB'),
	path('selectTournament/', views.selectTournament, name='selectTournament'),
	path('createPlayer/', views.createPlayer, name='createPlayer'),
	path('deletePlayer/', views.deletePlayer, name='deletePlayer'),
	path('validTournament/', views.validTournament, name='validTournament'),
	path('startGame/', views.startGame, name='startGame'),
	path('startTournament/', views.startTournament, name='startTournament'),
	path('endGame/', views.endGame, name='endGame'),
	path('continueTournament/', views.continueTournament, name='continueTournament'),
]
