from django.urls import path
from . import views

urlpatterns = [
	path('selectTournament/', views.selectTournament, name="selectTournament"),
	path('createPlayer/', views.createPlayer, name="createPlayer"),
	path('deletePlayer/', views.deletePlayer, name="deletePlayer")
]
