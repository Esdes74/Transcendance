import os

from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Pong.settings")


from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from calcul.routing import websocket_urlpatterns

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),  # Les requêtes HTTP passent par urls.py
        "websocket": AuthMiddlewareStack(URLRouter(websocket_urlpatterns)),
    }
)
