import asyncio
import websockets
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class CalculConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print('Connecté')
		await self.accept()

		self.player1Y = 0.5
		self.player2Y = 0.5
		self.scorePlayer1 = 0
		self.scorePlayer2 = 0
		self.ballX = 0.5
		self.ballY = 0.5
		self.ballSpeedX = 3
		self.ballSpeedY = 3
		self.max_speed = 16
		self.acceleration = 1.1

		print(f">>>>>>> PHASE D'INITIALISATION : {self.player1Y}")

	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		data = json.loads(text_data)

		if data.get('type') == 'pong.move':
			# afficher le message reçu
			print(f"-----> pong.move donc : {data}")

			key = data['key']

			#todo switch case
			if key == 'w':
				self.player1Y = self.player1Y - 0.02
				print(f"-----> player1Y : {self.player1Y}")
				print(f"-----> player2Y : {self.player2Y}")
				await self.send(text_data=json.dumps({
				'type': 'pong.player1',
				'player1Y': self.player1Y
				}))
			elif key == 's':
				self.player1Y = self.player1Y + 0.02
				print(f"-----> player1Y : {self.player1Y}")
				print(f"-----> player2Y : {self.player2Y}")
				await self.send(text_data=json.dumps({
				'type': 'pong.player1',
				'player1Y': self.player1Y
				}))
			elif key == 'ArrowUp':
				self.player2Y = self.player2Y - 0.02
				print(f"-----> player1Y : {self.player1Y}")
				print(f"-----> player2Y : {self.player2Y}")
				await self.send(text_data=json.dumps({
				'type': 'pong.player2',
				'player2Y': self.player2Y
				}))
			elif key == 'ArrowDown':
				self.player2Y = self.player2Y + 0.02
				print(f"-----> player1Y : {self.player1Y}")
				print(f"-----> player2Y : {self.player2Y}")
				await self.send(text_data=json.dumps({
				'type': 'pong.player2',
				'player2Y': self.player2Y
				}))
			else:
				print('key non reconnue')
				await self.send(text_data=json.dumps({
				'type': 'pong.error',
				'error': 'key non reconnue'
				}))

		# if data.get('type') == 'pong.ball'
			# await self.send(text_data=json.dumps({
			# 	'type': 'pong.ball',
			# 	'ballX': self.ballX,
			# 	'ballY': self.ballY,
			# 	'ballSpeedX': self.ballSpeedX,
			# 	'ballSpeedY': self.ballSpeedY,
			# }))
		
		# if data.get('type') == 'pong.score'
			# await self.send(text_data=json.dumps({
			# 	'type': 'pong.score',
			# 	'scorePlayer1': self.scorePlayer1,
			# 	'scorePlayer2': self.scorePlayer2,
			# }))





		# await self.send(text_data=f"The one piece is real : {text_data}")
