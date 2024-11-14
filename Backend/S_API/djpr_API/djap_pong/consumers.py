from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import websockets

class PongConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

		self.printball = False
		self.keys = {}
		self.send_task = asyncio.create_task(self.send_keys_periodically())
		# sleep 3seconde
		await asyncio.sleep(3)
		self.update_ball_task = asyncio.create_task(self.update_ball_position())
		self.websocket_lock = asyncio.Lock()  # Ajouter un verrou

	async def disconnect(self, close_code):
		# self.send_task.cancel()
		# self.update_ball_task.cancel()
		pass

	async def receive(self, text_data):
		data = json.loads(text_data)
		type = data.get('type', 'malformed request')
		key = data.get('key', 'malformed request')

		if type == 'key.pressed' and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
			self.keys[key] = True
		if type == 'key.released' and key in ['w', 's', 'ArrowUp', 'ArrowDown']:
			self.keys[key] = False

		# if type == 'pong.ball':
		# 	print(f"ball")
		# 	response = await self.send_to_pong_service(json.dumps({'type': 'pong.ball'}))
		# 	await self.send(response)


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
		except asyncio.CancelledError:
			print("send_keys_periodically task was cancelled")
		except Exception as e:
			print(f"Exception in send_keys_periodically: {e}")

# Le bug des players qui ne repondaient plus d'un coup, venait en fait d'une erreur qui n'était pas catch 
# dans le send_keys_periodically. L'exception disait "dictionary changed size during iteration"
# Il fallait donc faire une copie de la liste des keys pour pouvoir itérer dessus sans problème.

	async def update_ball_position(self):
		try:
			while self.printball == False:
				response = await self.send_to_pong_service(json.dumps({'type': 'pong.ball'}))
				data = json.loads(response)
				if data.get('scorePlayer1') >= 5 or data.get('scorePlayer2') >= 5:
					self.printball = True
				await self.send(response)
				await asyncio.sleep(0.01)  # Mettre à jour la position de la balle toutes les 10 ms
		except asyncio.CancelledError:
			print("update_ball_position task was cancelled")
		except Exception as e:
			print(f"Exception in update_ball_position: {e}")

	async def send_to_pong_service(self, data):
		# print(f"FCT send_to_pong_service")

		# Check if the WebSocket connection already exists
		if not hasattr(self, 'websocket'): # or self.websocket.closed:
			uri = "ws://django-Pong:8000/ws/pong/calcul"  # WebSocket service Pong
			self.websocket = await websockets.connect(uri)

		# Send data using the existing or new WebSocket connection
		async with self.websocket_lock:
			await self.websocket.send(data)
			response = await self.websocket.recv()

		# print(f"FCT <--- Réponse du service Pong")
		return response
