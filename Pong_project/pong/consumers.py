import json
from channels.generic.websocket import AsyncWebsocketConsumer

class PongConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		data = json.loads(text_data)

		# Simuler la gestion des messages reçus depuis le client
		if data['type'] == 'pong.move':
			# Ici, on pourrait traiter les mouvements des joueurs
				await self.send(text_data=json.dumps({
				'type': 'pong.update',
				'message': 'Player moved'
			}))

