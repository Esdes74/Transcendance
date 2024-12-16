from django.urls import path
from . import views

urlpatterns = [
	path('selectTournament/', views.selectTournament, name='selectTournament'), # redirige vers la gestion du selcetion de tournoi
	# path('create/', views.create_view, name='create'), # redirige vers la gestion du login
	# path('2fa/', views.otp_verif, name='verif'), # redirige vers la gestion du 2fa
]
