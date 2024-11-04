import asyncio
import websockets
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class CalculConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print('Connecté')
		await self.accept()

		self.player1X = 0.05
		self.player2X = 1 - 0.05
		self.player1Y = 0.5
		self.player2Y = 0.5
		self.playerHeight = 0.30
		self.scorePlayer1 = 0
		self.scorePlayer2 = 0
		self.ballX = 0.5
		self.ballY = 0.5
		self.ballSpeedX = 0.01
		self.ballSpeedY = 0.01
		# self.ballRadius = 8
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
				await self.send(text_data=json.dumps({
				'type': 'pong.player1',
				'player1Y': self.player1Y
				}))
			elif key == 's':
				self.player1Y = self.player1Y + 0.02
				await self.send(text_data=json.dumps({
				'type': 'pong.player1',
				'player1Y': self.player1Y
				}))
			elif key == 'ArrowUp':
				self.player2Y = self.player2Y - 0.02
				await self.send(text_data=json.dumps({
				'type': 'pong.player2',
				'player2Y': self.player2Y
				}))
			elif key == 'ArrowDown':
				self.player2Y = self.player2Y + 0.02
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

		elif data.get('type') == 'pong.ball':
			self.ballX += self.ballSpeedX
			self.ballY += self.ballSpeedY
			if abs(self.ballSpeedX) >= self.max_speed:
				self.ballSpeedX = (1 if self.ballSpeedX > 0 else -1) * self.max_speed

			# Rebondir sur le haut et le bas du terrain
			if self.ballY >= 1 or self.ballY <= 0:
				self.ballSpeedY = -self.ballSpeedY

			# Détection de collision avec les raquettes
			if self.ballX <= self.player1X and self.ballY > self.player1Y - (self.playerHeight / 2) and self.ballY < self.player1Y + (self.playerHeight / 2):
				self.ballSpeedX = abs(self.ballSpeedX)  # Rebond immédiat
			if self.ballX >= self.player2X and self.ballY > self.player2Y - (self.playerHeight / 2) and self.ballY < self.player2Y + (self.playerHeight / 2):
				self.ballSpeedX = -abs(self.ballSpeedX)  # Rebond immédiat

			await self.send(text_data=json.dumps({
				'type': 'pong.ball',
				'ballX': self.ballX,
				'ballY': self.ballY,
				'ballSpeedX': self.ballSpeedX,
				'ballSpeedY': self.ballSpeedY,
				}))
			print(f"self.ballX : {self.ballX}")
			print(f"self.ballY : {self.ballY}")
			print(f"self.ballSpeedX : {self.ballSpeedX}")
			print(f"self.ballSpeedY : {self.ballSpeedY}")
			print(f"self.player1X : {self.player1X}, self.player1Y : {self.player1Y}")
			print(f"self.player2X : {self.player2X}, self.player2Y : {self.player2Y}")


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
