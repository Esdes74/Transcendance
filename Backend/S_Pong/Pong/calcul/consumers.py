import asyncio
import websockets
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class CalculConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print('Connecté')
		await self.accept()

		self.action = True
		self.nextService = 1
		self.player1X = 0.05
		self.player2X = 1 - 0.05
		self.player1Y = 0.5
		self.player2Y = 0.5
		self.playerHeight = 0.30
		self.scorePlayer1 = 0
		self.scorePlayer2 = 0
		self.ballX = 0.5
		self.ballY = 0.5
		self.ballSpeedX = 0.003
		self.ballSpeedY = 0.003
		self.max_speed = 0.012
		self.acceleration = 1.1

		print(f">>>>>>> PHASE D'INITIALISATION : {self.player1Y}")

	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		data = json.loads(text_data)

		if data.get('type') == 'pong.move':
			key = data['key']

			if key == 'w':
				if self.player1Y - (self.playerHeight / 2) > 0:
					self.player1Y = self.player1Y - 0.012
			elif key == 's':
				if self.player1Y + (self.playerHeight / 2) < 1:
					self.player1Y = self.player1Y + 0.012
			elif key == 'ArrowUp':
				if self.player2Y - (self.playerHeight / 2) > 0:
					self.player2Y = self.player2Y - 0.012
			elif key == 'ArrowDown':
				if self.player2Y + (self.playerHeight / 2) < 1:
					self.player2Y = self.player2Y + 0.012
			else:
				print('key non reconnue')

		elif data.get('type') == 'pong.ball':
			if self.action == False:				# Ici si l'action est en pause soit si goal
				await asyncio.sleep(0.5)
				self.action = True
				self.ballSpeedX = 0.003 * self.nextService
				self.ballSpeedY = 0.003
			self.ballX += self.ballSpeedX
			self.ballY += self.ballSpeedY
			if abs(self.ballSpeedX) >= self.max_speed:
				self.ballSpeedX = (1 if self.ballSpeedX > 0 else -1) * self.max_speed

			# Rebondir sur le haut et le bas du terrain
			if self.ballY >= 1 - 0.02:
				self.ballSpeedY = -abs(self.ballSpeedY)
			if self.ballY <= 0 + 0.02:
				self.ballSpeedY = abs(self.ballSpeedY)

			# Détection de collision avec les raquettes
			if self.ballX <= self.player1X - 0.02 and self.ballY > self.player1Y - (self.playerHeight / 2) and self.ballY < self.player1Y + (self.playerHeight / 2):
				self.ballSpeedX = abs(self.ballSpeedX) * self.acceleration # Rebond immédiat
				self.ballSpeedY = (self.ballY - self.player1Y) * 0.03 * self.acceleration		# Rebond en fonction de la position de la raquette
			if self.ballX >= self.player2X + 0.02 and self.ballY > self.player2Y - (self.playerHeight / 2) and self.ballY < self.player2Y + (self.playerHeight / 2):
				self.ballSpeedX = -abs(self.ballSpeedX) * self.acceleration # Rebond immédiat
				self.ballSpeedY = (self.ballY - self.player2Y) * 0.03 * self.acceleration		# Rebond en fonction de la position de la raquette

			# Réinitialiser la balle si elle sort du terrain
			if self.ballX >= 1:				# Joueur 1 marque
				self.scorePlayer1 = self.scorePlayer1 + 1
				await self.resetBall(-1);						# Renvoyer la balle vers la gauche
				
			if	self.ballX <= 0:			# Joueur 2 marque
				self.scorePlayer2 = self.scorePlayer2 + 1
				await self.resetBall(1);						# Renvoyer la balle vers la gauche

		await self.send(text_data=json.dumps({
			'type': 'pong.update',
			'player1Y': self.player1Y,
			'player2Y': self.player2Y,
			'ballX': self.ballX,
			'ballY': self.ballY,
			'scorePlayer1': self.scorePlayer1,
			'scorePlayer2': self.scorePlayer2,
			'action': self.action,
			}))


	async def resetBall(self, direction):
		self.action = False
		self.nextService = direction
		self.ballX = 0.5
		self.ballY = 0.5

	# await self.send(text_data=f"The one piece is real : {text_data}")
