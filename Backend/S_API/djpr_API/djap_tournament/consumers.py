from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import websockets

class TournamentConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		self.websocket_lock = asyncio.Lock()
		print("Coucou")
		await self.accept()


	async def disconnect(self, close_code):
		pass


	async def receive(self, text_data):
		# print(text_data)
		data = json.loads(text_data)
		# print("HEOO HEEOO C'EST MOI")
		type = data.get('type', 'malformed request')

		if type == 'click':
			btn = data.get('btn', 'malformed request')
			response = await self.send_to_tournament_service(json.dumps({"type": "click", "btn": btn}))
			await self.send(response)

		elif type == 'Enter':
			name = data.get('name', 'malformed request')
			index = data.get('index', 'malformed request')
			response = await self.send_to_tournament_service(json.dumps({"type": "Enter", "name": name, "index": index}))
			await self.send(response)
			# print("Cest le moment de la verité")

		elif type == 'delete':
			name = data.get('name', 'malformed request')
			index = data.get('index', 'malformed request')
			nameContainer = data.get('nameContainer', 'malformed request')
			response = await self.send_to_tournament_service(json.dumps({"type": "delete", "name": name, "index": index}))
			await self.send(response)

		elif type == 'Valid':
			response = await self.send_to_tournament_service(json.dumps({"type": "Valid"}))
			await self.send(response)


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


	# async def send_to_tournamentCalculConsumer(self, event):
	# 	await self.send(text_data=json.dumps(event))
		# print('send_to_tournamentCalculConsumer')
