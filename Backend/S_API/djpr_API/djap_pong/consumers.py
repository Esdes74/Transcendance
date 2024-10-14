from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import websockets

class PongConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		data = json.loads(text_data)
		
		# Envoie ce message au service Pong
		print(f"Message reçu de l'API : {data.get('key', 'No content')}")
		response = await self.send_to_pong_service(data.get('key', 'malformed request'))

		# Envoie la réponse reçue au frontend
		await self.send(text_data=json.dumps({
			'response': response
		}))


	async def send_to_pong_service(self, data):
		uri = "ws://django-Pong:8000/ws/pong/calcul"  # WebSocket service Pong
		async with websockets.connect(uri) as websocket:
			await websocket.send(data)
			response = await websocket.recv()
			print(f"Réponse du service Pong : {response}")
			return response
