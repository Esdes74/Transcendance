"""
URL configuration for test project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from . import views

urlpatterns = [
	path('delete/', views.delete, name='delete'), # redirige vers la suppresssion du compte
	path('choose_lang/', views.choose_lang, name='choose_lang'), # redirige vers le choix de la langue
	path('choose_verif/', views.choose_verif, name='choose_verif'), # redirige vers la mise en place du 2fa
	path('get_lang/', views.get_lang, name='get_lang'), # renvois la valeur de la langue choisie
	path('get_verif/', views.get_verif, name='get_verif'), # renvois la valeur de la vérification choisie
]
