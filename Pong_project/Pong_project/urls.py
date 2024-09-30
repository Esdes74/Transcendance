"""
URL configuration for Pong_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
	path('admin/', admin.site.urls),
	path('pong/', include('pong.urls')),  # Redirection vers les URLs de l'application Pong
]

# from django.contrib import admin
# from django.urls import path, include, re_path
# from pong import consumers

# urlpatterns = [
#     path('admin/', admin.site.urls),
# 	path('', include('pong.urls')),  # Inclure les URLs de ton application pong
# 	re_path(r'ws/pong/$', consumers.PongConsumer.as_asgi()),
# ]
