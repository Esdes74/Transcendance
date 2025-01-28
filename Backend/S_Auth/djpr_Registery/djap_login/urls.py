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
	path('register/', views.login, name="login_auth"),
	path('create/', views.create, name="profile_creation"),
	path('2fa/', views.otp, name="profile_creation"),
	path('get_me/', views.get_me, name="get_me"),
	path('refresh_2fa/', views.refresh_2fa, name="refresh_2fa"),
]
