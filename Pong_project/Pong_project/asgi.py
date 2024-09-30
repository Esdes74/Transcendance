"""
ASGI config for Pong_project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from pong.routing import websocket_urlpatterns

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Pong_project.settings')

application = ProtocolTypeRouter({
			# 'websocket':URLRouter(websocket_urlpatterns),
	'http': get_asgi_application(),
	'websocket': AuthMiddlewareStack(
		URLRouter(
			websocket_urlpatterns
		)
	),
})