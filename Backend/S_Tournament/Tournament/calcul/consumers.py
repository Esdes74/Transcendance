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
		self.old_size = 0
		self.champs_libre = 0
		self.player_list = []


	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		data = json.loads(text_data)
		# print('data :', data)
		# print('player registered :', self.player_registered, '	size : ', self.size, '	old_size :', self.old_size, '	champs_libre :', self.champs_libre)
		if data.get('type') == 'click':
			if data.get('btn') == 'btn1':
				if self.player_registered > 3:
					await self.send(text_data=json.dumps({
						'type': 'error',
						'error': 'Vous avez déjà trop de joueurs inscrits'
					}))
					return 
				self.old_size = self.size
				self.size = 3
				self.champs_libre = self.size - self.player_registered
			elif data.get('btn') == 'btn2':
				if self.player_registered > 4:
					await self.send(text_data=json.dumps({
						'type': 'error',
						'error': 'Vous avez déjà trop de joueurs inscrits'
					}))
					return
				self.old_size = self.size
				self.size = 4
				self.champs_libre = self.size - self.player_registered
			elif data.get('btn') == 'btn3':
				self.old_size = self.size
				self.size = 8
				self.champs_libre = self.size - self.player_registered
			# print('player registered :', self.player_registered, '	size : ', self.size, '	old_size :', self.old_size, '	champs_libre :', self.champs_libre)
			await self.send(text_data=json.dumps({
				'type': 'click',
				'size': self.size,
				'old_size': self.old_size,
				'champs_libre': self.champs_libre,
			}))

		elif data.get('type') == 'Enter':
		# 	# TODO check le name et condition de securité 

			self.player_registered = self.player_registered + 1
			self.old_size = self.old_size - self.player_registered
			self.player_list.append(data.get('name'))

			await self.send(text_data=json.dumps({
				'type': 'Enter',
				'name': data.get('name'),
				'index': data.get('index'),
				'player_list' : self.player_list,
				'fields': self.old_size
			}))

		elif data.get('type') == 'delete':
			# print('data name :', data.get('name'))
			# print('data index :', data.get('index'))
			self.player_registered = self.player_registered - 1
			self.player_list.remove(data.get('name'))
			
			await self.send(text_data=json.dumps({
				'type': 'delete',
				'name': data.get('name'),
				'index': data.get('index'),
				# 'nameContainer': data.get('nameContainer'),
				'player_list' : self.player_list,
				'fields': self.old_size
			}))

		else:
			pass

			

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
