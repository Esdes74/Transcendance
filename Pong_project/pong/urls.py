from django.urls import path
from . import views  # Assure-toi que views est importé

urlpatterns = [
    path('', views.pong_view, name='pong'),  # Associe la vue pong_view à l'URL racine
]
