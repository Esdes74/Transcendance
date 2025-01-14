"""
ASGI config for djpr_API project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djpr_API.settings")

# application = get_asgi_application()


from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from djap_pong.routing import websocket_urlpatterns
from djap_tournament.routing import websocket_urlpatterns_tournament

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),  # Les requêtes HTTP passent par urls.py
        "websocket": AuthMiddlewareStack(URLRouter(websocket_urlpatterns + websocket_urlpatterns_tournament)),
	}
)
