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
			self.ia_sleeptime = 0
			self.botPos = 0
			if (path == "/ws/pong/ai/easy"):
				self.latency = 0.4
			elif (path == "/ws/pong/ai/medium"):
				self.latency = 0.3
			else:
				self.latency = 0.2
		await self.accept()

		self.printball = False
		self.keys = {'ArrowUp': False,
				'ArrowDown': False}
		self.send_task = asyncio.create_task(self.send_keys_periodically())
		for i in range(4):
			if i != 0:
				await asyncio.sleep(1)
			await self.send(json.dumps({'type': 'pong.countdown', 'value': 3-i}))
		self.update_ball_task = asyncio.create_task(self.update_ball_position())
		self.websocket_lock = asyncio.Lock()
		if (self.ai_enabled):
			self.ask_ia_task = asyncio.create_task(self.ask_ia_movement())
			self.websocket_lock_AI = asyncio.Lock()

	async def disconnect(self, close_code):
		self.send_task.cancel()
		self.update_ball_task.cancel()
		if (self.ai_enabled):
			self.ask_ia_task.cancel()	
		pass

	async def receive(self, text_data):
		try:
			data = json.loads(text_data)
			actionType = data.get('type', 'malformed request')
			key = data.get('key', 'malformed request')
			if (self.ai_enabled and key in ['ArrowUp', 'ArrowDown']):
				return
			if key in ['W', 'S']:
				key = key.lower()
			if actionType == 'key.pressed' and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
				self.keys[key] = True
			if actionType == 'key.released' and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
				self.keys[key] = False
		except Exception as e:
			await self.send(json.dumps({'type': 'error'}))

	async def send_keys_periodically(self):
		try:
			while self.printball == False:
				keys_copy = list(self.keys.items())
				for k, value in keys_copy:
					if value == True and k in ['w', 's', 'ArrowUp', 'ArrowDown']:
						response = await self.send_to_pong_service(json.dumps({'type': 'pong.move', 'key': k}))
						await self.send(response)
				await asyncio.sleep(0.005)
		except Exception as e:
			await self.send(json.dumps({'type': 'error'}))

	async def update_ball_position(self):
		try:	
			while self.printball == False:
				response = await self.send_to_pong_service(json.dumps({'type': 'pong.ball'}))
				data = json.loads(response)
				if data.get('scorePlayer1') >= 5 or data.get('scorePlayer2') >= 5:
					self.printball = True

				if (self.ai_enabled and self.keys['ArrowUp'] == True and data.get('player2Y') < self.botPos):
					self.keys['ArrowUp'] = False
				if (self.ai_enabled and self.keys['ArrowDown'] == True and data.get('player2Y') > self.botPos):
					self.keys['ArrowDown'] = False
				await self.send(response)
				await asyncio.sleep(0.005)
		except Exception as e:
			await self.send(json.dumps({'type': 'error'}))

	async def ask_ia_movement(self):
		try:
			while self.printball == False:
				await asyncio.sleep(self.ia_sleeptime)
				await self.ia_ask_position()
		except Exception as e:
			await self.send(json.dumps({'type': 'error'}))

	async def send_to_pong_service(self, data):

		try :
			if not hasattr(self, 'websocket'):
				uri = "ws://django-Pong:8000/ws/pong/calcul"
				self.websocket = await websockets.connect(uri)

			async with self.websocket_lock:
				await self.websocket.send(data)
				response = await self.websocket.recv()

			return response
		except Exception as e:
			await self.send(json.dumps({'type': 'error'}))

	async def send_to_ai_service(self, data):

		try:
			if not hasattr(self, 'websocketAI'):
				uri = "ws://django-AI:8000/ws/AI/multiply"
				self.websocketAI = await websockets.connect(uri)

			async with self.websocket_lock_AI:
				await self.websocketAI.send(data)
				response = await self.websocketAI.recv()
			return response
		
		except Exception as e:
			await self.send(json.dumps({'type': 'error'}))

	async def ia_ask_position(self):
		try:
			response = await self.send_to_pong_service(json.dumps({'type': 'getDatas'}))
			responseData = json.loads(response)
			responseData['latency'] = self.latency
			response_ai = await self.send_to_ai_service(json.dumps(responseData))
			data = json.loads(response_ai)	
			if (data.get('Move') == "NoMove"):
				self.keys['ArrowDown'] = False
				self.keys['ArrowUp'] = False
			elif (data.get('Move') == "ArrowUp"):
				self.keys['ArrowDown'] = False
				self.keys['ArrowUp'] = True
				self.botPos = data.get('destY')
			else:
				self.keys['ArrowUp'] = False
				self.keys['ArrowDown'] = True
				self.botPos = data.get('destY')
			self.ia_sleeptime = data.get('SleepTime')
		except Exception as e:
			await self.send(json.dumps({'type': 'error'}))
