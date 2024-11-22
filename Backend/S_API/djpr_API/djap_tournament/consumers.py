from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import websockets

class TournamentConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()
	
	async def disconnect(self, close_code):
		pass
	
	async def receive(self, text_data):
		pass

	async def send_to_tournamentCalculConsumer(self, event):
		await self.send(text_data=json.dumps(event))
		print('send_to_tournamentCalculConsumer')

	async def send_to_tournament_service(self, data):

		# Check if the WebSocket connection already exists
		if not hasattr(self, 'websocket'):
			uri = "ws://django-Tournament:8000/ws/Tournament/calcul"
			self.websocket = await websockets.connect(uri)

		# Send data using the existing or new WebSocket connection
		async with self.websocket_lock:
			await self.websocket.send(data)
			response = await self.websocket.recv()

		return response

