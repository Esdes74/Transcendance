from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import websockets

class PongConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

		self.keys = {}
		# await self.loop_task()

	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		data = json.loads(text_data)
		type = data.get('type', 'malformed request')
		key = data.get('key', 'malformed request')


		if type == 'key.pressed':
			self.keys[key] = True
		if type == 'key.released':
			self.keys[key] = False

		for k, value in self.keys.items():
			print(f"keys : {self.keys}")
			if value == True and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
				response = await self.send_to_pong_service(json.dumps({'type': 'pong.move', 'key': k}))
				# new_positions = json.loads(response)
				await self.send(response)

		if type == 'pong.ball':
			print(f"ball")
			response = await self.send_to_pong_service(json.dumps({'type': 'pong.ball'}))
			await self.send(response)

		# if type == 'pong.move':
		# 	print(f"-----> Envoie au CalculConsumer la data : {data}")
		# 	# Envoie au service calcul pour déterminer les nouvelles positions
		# 	response = await self.send_to_pong_service(json.dumps({'type': 'pong.move', 'key': key}))

		# 	# Extrait les nouvelles positions du service calcul
		# 	new_positions = json.loads(response)
		# 	# afficher la response reçue
		# 	print(f"response : {response}")
		# 	await self.send(response)



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

	# async def loop_task(self):
	# 	while True:
	# 		for k, value in self.keys.items():
	# 			# print(f"keys : {self.keys}")
	# 			if value == True and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
	# 				response = await self.send_to_pong_service(json.dumps({'type': 'pong.move', 'key': k}))
	# 				# new_positions = json.loads(response)
	# 				await self.send(response)
	# 			await asyncio.sleep(0.1)



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
