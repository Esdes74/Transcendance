from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import websockets

class PongConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

		self.keys = {}
		self.send_task = asyncio.create_task(self.send_keys_periodically())
		self.websocket_lock = asyncio.Lock()  # Ajouter un verrou

	async def disconnect(self, close_code):
		self.send_task.cancel()

	async def receive(self, text_data):
		data = json.loads(text_data)
		type = data.get('type', 'malformed request')
		key = data.get('key', 'malformed request')

		if type == 'key.pressed' and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
			self.keys[key] = True
		if type == 'key.released' and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
			self.keys[key] = False

		if type == 'pong.ball':
			print(f"ball")
			response = await self.send_to_pong_service(json.dumps({'type': 'pong.ball'}))
			await self.send(response)


	async def send_keys_periodically(self):
		while True:
			for k, value in self.keys.items():
				print(f"keys : {self.keys}")
				if value == True and k in ['w', 's', 'ArrowUp', 'ArrowDown']:
					response = await self.send_to_pong_service(json.dumps({'type': 'pong.move', 'key': k}))
					await self.send(response)
			await asyncio.sleep(0.01)


	async def send_to_pong_service(self, data):
		print(f"FCT send_to_pong_service")

		# Check if the WebSocket connection already exists
		if not hasattr(self, 'websocket') or self.websocket.closed:
			uri = "ws://django-Pong:8000/ws/pong/calcul"  # WebSocket service Pong
			self.websocket = await websockets.connect(uri)

		# Send data using the existing or new WebSocket connection
		async with self.websocket_lock:
			await self.websocket.send(data)
			response = await self.websocket.recv()

		print(f"FCT <--- Réponse du service Pong")
		return response
