import asyncio
import websocket
from channels.generic.websocket import AsyncWebsocketConsumerwebsockets
import json

class TournamentCaluclConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		pass
	
	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		pass
