import asyncio
import websockets
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class CalculConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print('Connecté')
		await self.accept()

	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		# data = json.loads(text_data)
		print(f"Message reçu de l'API : {text_data}")
		# Traitez le message ici (par exemple, mises à jour du jeu)
		# response = f"Réponse du service Pong : {data[::-1]}"  # Exemple de traitement
		await self.send(text_data=f"The one piece is real : {text_data}")

		await self.close()




# if data['type'] == 'pong.move':
# 			key = data['key']
			
# 			#gerer les mouvements
# 			if key == 'ArrowUp':
# 				await self.send(text_data=json.dumps({
# 					'type': 'pong.update',
# 					'message': 'Player moved up'
# 				}))
# 				print('Player moved up')
# 			if key == 'ArrowDown':
# 				await self.send(text_data=json.dumps({
# 					'type': 'pong.update',
# 					'message': 'Player moved down'
# 				}))
# 				print('Player moved down')
