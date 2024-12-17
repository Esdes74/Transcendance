from django.urls import path
from . import views

urlpatterns = [
	path('initDB/', views.initDB, name="initDB"),
	path('selectTournament/', views.selectTournament, name="selectTournament"),
	path('createPlayer/', views.createPlayer, name="createPlayer"),
	path('deletePlayer/', views.deletePlayer, name="deletePlayer")
]
