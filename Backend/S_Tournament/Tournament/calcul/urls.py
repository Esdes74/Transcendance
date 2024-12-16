from django.urls import path
from . import views

urlpatterns = [
	path('selectTournament/', views.selectTournament, name="selectTournament"),
# 	path('create/', views.create, name="profile_creation"),
# 	path('2fa/', views.otp, name="profile_creation"),
]
