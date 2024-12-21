from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import websockets

class PongConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		path = self.scope['path']
		if (path == "/ws/pong/"):
			self.ai_enabled = False
		else:
			self.ai_enabled = True
		await self.accept()

		self.printball = False
		self.keys = {}
		self.send_task = asyncio.create_task(self.send_keys_periodically())
		# boucle for qui renvoie un send chaque seconde durant 3 secondes pour le coundown
		for i in range(4):
			if i != 0:
				await asyncio.sleep(1)
			await self.send(json.dumps({'type': 'pong.countdown', 'value': 3-i}))
		self.update_ball_task = asyncio.create_task(self.update_ball_position())
		self.websocket_lock = asyncio.Lock()
		if (self.ai_enabled):
			self.ia_sleeptime = 0
			self.ia_timing = 1
			self.ask_ia_task = asyncio.create_task(self.ask_ia_movement())
			self.websocket_lock_AI = asyncio.Lock()

	async def disconnect(self, close_code):
		self.send_task.cancel()
		self.update_ball_task.cancel()
		if (self.ai_enabled):
			self.ask_ia_task.cancel()	
		pass

	async def receive(self, text_data):
		data = json.loads(text_data)
		type = data.get('type', 'malformed request')
		key = data.get('key', 'malformed request')
		if (self.ai_enabled and key in ['ArrowUp', 'ArrowDown']):
			return
		if type == 'key.pressed' and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
			self.keys[key] = True

		if type == 'key.released' and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
			self.keys[key] = False

	async def send_keys_periodically(self):
		try:
			while self.printball == False:
				keys_copy = list(self.keys.items())
				for k, value in keys_copy:
					# print(f"keys : {self.keys}")
					if value == True and k in ['w', 's', 'ArrowUp', 'ArrowDown']:
						response = await self.send_to_pong_service(json.dumps({'type': 'pong.move', 'key': k}))
						await self.send(response)
				await asyncio.sleep(0.01)
		# except asyncio.CancelledError:
		# 	print("send_keys_periodically task was cancelled")
		except Exception as e:
			print(f"Exception in send_keys_periodically: {e}")

# Le bug des players qui ne repondaient plus d'un coup, venait en fait d'une erreur qui n'était pas catch 
# dans le send_keys_periodically. L'exception disait "dictionary changed size during iteration"
# Il fallait donc faire une copie de la liste des keys pour pouvoir itérer dessus sans problème.


	async def update_ball_position(self):
		try:
			#i = 0
			while self.printball == False:
				response = await self.send_to_pong_service(json.dumps({'type': 'pong.ball'}))
				data = json.loads(response)
				if data.get('scorePlayer1') >= 5 or data.get('scorePlayer2') >= 5:
					self.printball = True
				#if (i >= self.ia_sleeptime):
				#	await self.ia_ask_position("getDatas")
				#	i = 0
				#else:
				#	await self.ia_ask_position("noDatas")
				await self.send(response)
				await asyncio.sleep(0.01)
				#i += 0.01
		# except asyncio.CancelledError:
			# print("update_ball_position task was cancelled")
		except Exception as e:
			print(f"Exception in update_ball_position: {e}")

	async def ask_ia_movement(self):
		try:
			i = 0
			while self.printball == False:
				if (i >= self.ia_sleeptime):
					await self.ia_ask_position("getDatas")
					i = 0
				else:
					await self.ia_ask_position("noDatas")
				await asyncio.sleep(0.01)
				i += 0.01
		except Exception as e:
			print(f"Exception in ask_ia_movement: {e}")

	async def send_to_pong_service(self, data):

		# Check if the WebSocket connection already exists
		if not hasattr(self, 'websocket'):
			uri = "ws://django-Pong:8000/ws/pong/calcul"
			self.websocket = await websockets.connect(uri)

		# Send data using the existing or new WebSocket connection
		async with self.websocket_lock:
			await self.websocket.send(data)
			response = await self.websocket.recv()

		return response

	async def send_to_ai_service(self, data):

		# Check if the WebSocket connection already exists
		if not hasattr(self, 'websocketAI'):
			uri = "ws://django-AI:8000/ws/AI/multiply"
			self.websocketAI = await websockets.connect(uri)

		# Send data using the existing or new WebSocket connection
		async with self.websocket_lock_AI:
			await self.websocketAI.send(data)
			response = await self.websocketAI.recv()
			print(f"Réponse du service AI: {response}")

		return response

	async def ia_ask_position(self, text):
		self.ia_timing -= 0.01
		if (self.ia_timing <= 0):
			self.keys['ArrowUp'] = False
			self.keys['ArrowDown'] = False
		if (text == "getDatas"):
			try:
				response = await self.send_to_pong_service(json.dumps({'type': 'getDatas'}))
				response_ai = await self.send_to_ai_service(response)
				data = json.loads(response_ai)	
				if (data.get('Move') == "NoMove"):
					self.keys['ArrowDown'] = False
					self.keys['ArrowUp'] = False
				elif (data.get('Move') == "ArrowUp"):
					self.keys['ArrowDown'] = False
					self.keys['ArrowUp'] = True
				else:
					self.keys['ArrowUp'] = False
					self.keys['ArrowDown'] = True
				self.ia_timing = data.get('Timing')
				self.ia_sleeptime = data.get('SleepTime')
			except Exception as e:
				print(f"Exception in update_ball_position: {e}")
