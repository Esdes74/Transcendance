from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import websockets

class TournamentConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		self.websocket_lock = asyncio.Lock();
		print("Coucou")
		self.send_to_tournament_service(self, json.dumps({"tournament_id": self.tournament_id}))
		await self.accept()
	
	async def disconnect(self, close_code):
		pass
	
	async def receive(self, text_data):
		print(text_data)

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

