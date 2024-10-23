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
		type = data.get('type', 'malformed request')
		key = data.get('key', 'malformed request')
		
		if type == 'config':
			# Envoyer la configuration initiale au service calcul
			response = await self.send_to_pong_service(json.dumps(data))
			new_positions = json.loads(response)

			# Envoyer la réponse reçue au frontend
			await self.send(text_data=json.dumps({
				'type': 'pong.update',
				'player1Y': new_positions.get('player1Y'),
				# 'player2Y': new_positions.get('player2Y'),
				# 'ballX': new_positions.get('ballX'),
				# 'ballY': new_positions.get('ballY'),
				# 'scorePlayer1': new_positions.get('scorePlayer1'),
				# 'scorePlayer2': new_positions.get('scorePlayer2')
			}))
		elif type == 'pong.move':
			print(f"MSG RECU DE l'API : {key}")

			# Envoie au service calcul pour déterminer les nouvelles positions
			response = await self.send_to_pong_service(json.dumps({'type': 'pong.move', 'key': key}))
			# Extrait les nouvelles positions du service calcul
			new_positions = json.loads(response)
			# afficher la response reçue
			print(f"Réponse reçue new_positions : {new_positions}")

		# Envoie la réponse reçue au frontend
		await self.send(text_data=json.dumps({
				'type': 'pong.update',
				'player1Y': new_positions.get('player1Y'),
				# 'player2Y': new_positions.get('player2Y'),
				# 'ballX': new_positions.get('ballX'),
				# 'ballY': new_positions.get('ballY'),
				# 'scorePlayer1': new_positions.get('scorePlayer1'),
				# 'scorePlayer2': new_positions.get('scorePlayer2')
			}))
			# afficher la nouvelle position du player1Y
		print(f"player1Y : {new_positions.get('player1Y')}")


	async def send_to_pong_service(self, data):
		uri = "ws://django-Pong:8000/ws/pong/calcul"  # WebSocket service Pong
		async with websockets.connect(uri) as websocket:
			await websocket.send(data)
			response = await websocket.recv()
			print(f"Réponse du service Pong : {response}")
			return response
