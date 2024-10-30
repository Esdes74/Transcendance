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

# 		# for key in keys
		# 	up + 0.2
		# if type == ':
		# 	keys ={}
		# 	keys['w'] = True
		# print(f"-----> Envoie au CalculConsumer la data : {data}")
		# # Envoie au service calcul pour déterminer les nouvelles positions
		# response = await self.send_to_pong_service(json.dumps({'type': 'pong.move', 'key': key})) #todo: envoyer le type config sinon le calcul consumer a une configuration manquante OU envoyer toutes les données (player1Y, player2Y, ballX, ballY, scorePlayer1, scorePlayer2)

		if type == 'pong.move':
			print(f"-----> Envoie au CalculConsumer la data : {data}")
			# Envoie au service calcul pour déterminer les nouvelles positions
			response = await self.send_to_pong_service(json.dumps({'type': 'pong.move', 'key': key})) #todo: envoyer le type config sinon le calcul consumer a une configuration manquante OU envoyer toutes les données (player1Y, player2Y, ballX, ballY, scorePlayer1, scorePlayer2)

			# Extrait les nouvelles positions du service calcul
			new_positions = json.loads(response)
			# afficher la response reçue
			print(f"<----- Réponse reçue new_positions : {new_positions}")
			print(f"response : {response}")
			await self.send(response)

		# Envoie la réponse reçue au frontend
		# await self.send(text_data=json.dumps({
		# 		'type': 'pong.update',
		# 		'player1Y': new_positions.get('player1Y'),
		# 		'player2Y': new_positions.get('player2Y'),
		# 		'ballX': new_positions.get('ballX'),
		# 		'ballY': new_positions.get('ballY'),
		# 		'scorePlayer1': new_positions.get('scorePlayer1'),
		# 		'scorePlayer2': new_positions.get('scorePlayer2')
		# 	}))
			# afficher la nouvelle position du player1Y
		# print(f"DEBUG: new position du player1Y : {new_positions.get('player1Y')}")



	async def send_to_pong_service(self, data):
		print(f"FCT send_to_pong_service")

		# Check if the WebSocket connection already exists
		if not hasattr(self, 'websocket') or self.websocket.closed:
			uri = "ws://django-Pong:8000/ws/pong/calcul"  # WebSocket service Pong
			self.websocket = await websockets.connect(uri)

		# Send data using the existing or new WebSocket connection
		await self.websocket.send(data)
		response = await self.websocket.recv()

		print(f"FCT <--- Réponse du service Pong")
		return response



	# async def send_to_pong_service(self, data):
	# 	#check if not connected to the service
	# 	print(f"FCT send_to_pong_service")
	# 	if not websockets.connect:
	# 		uri = "ws://django-Pong:8000/ws/pong/calcul"  # WebSocket service Pong
	# 		async with websockets.connect(uri) as websocket:
	# 			await websocket.send(data)
	# 			response = await websocket.recv()
	# 	print(f"FCT <--- Réponse du service Pong : {response}")
	# 	return response
