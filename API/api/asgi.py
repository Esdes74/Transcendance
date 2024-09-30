"""
ASGI config for api project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')

# application = get_asgi_application()




from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from pong import consumer

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Les requêtes HTTP passent par urls.py
    "websocket": URLRouter([         # Les connexions WebSocket sont gérées ici
        path("ws/pong/", consumer.pong_consumer.as_asgi()),  # Route WebSocket
    ]),
})
