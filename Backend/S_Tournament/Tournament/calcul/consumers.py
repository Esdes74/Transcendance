from channels.generic.websocket import AsyncWebsocketConsumer
import asyncio
import json
import websockets

# Consumer du Tournament

class CalculConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print('oueeee')
		await self.accept()
		self.player_registered = 0
		self.size = 0
		print('ITS ME MARIO 2')
		self.player_list = []


	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		print('ITS ME MARIO')
		data = json.loads(text_data)
		if data.get('type') == 'click':
			if data.get('btn') == 'btn1':
				fields = self.size - self.player_registered
				self.size = 3
			elif data.get('btn') == 'btn2':
				fields = self.size - self.player_registered
				self.size = 4
			elif data.get('btn') == 'btn3':
				fields = self.size - self.player_registered
				self.size = 8

			await self.send(text_data=json.dumps({
				'type': 'click',
				'size': self.size,
				'fields': fields
			}))

		elif data.get('type') == 'Enter':
		# 	# TODO check le name et condition de securité 
			
			self.player_registered += 1
			print('Entrer cest ouvert')
			fields = self.size - self.player_registered
			self.player_list.append(data.get('name'))

			await self.send(text_data=json.dumps({
				'type': 'Enter',
				'name': data.get('name'),
				'index': data.get('index'),
				'inputsContainer': data.get('inputsContainer'),
				'player_list' : self.player_list,
				'fields': fields
			}))

		else:
			print('Eh bah dis donc la cest pas bon')

			

	# async def send_to_tournamentConsumer(self, event):
	# 	await self.send(text_data=json.dumps(event))
	# 	print('send_to_tournamentConsumer')

	# async def send_to_tournament_service(self, data):

	# 	# Check if the WebSocket connection already exists
	# 	if not hasattr(self, 'websocket'):
	# 		uri = "ws://django-Tournament:8000/ws/Tournament"
	# 		self.websocket = await websockets.connect(uri)

	# 	# Send data using the existing or new WebSocket connection
	# 	async with self.websocket_lock:
	# 		await self.websocket.send(data)
	# 		response = await self.websocket.recv()

		# return response
