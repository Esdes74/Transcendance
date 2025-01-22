import json
from channels.generic.websocket import AsyncWebsocketConsumer
import random
import logging

class myConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()
		self.playerPos = 0
		self.botPos = 0
		self.ballPosX = 0
		self.ballPosY = 0
		self.ballSpeedX = 0
		self.ballSpeedY = 0
		self.acceleration = 0
	async def disconnect(self, close_code):
		pass
	
	async def receive(self, text_data):	
		ArrowDown = False
		ArrowUp = False
		data = {}
		try:
			data = json.loads(text_data)
		except Exception as e:
			pass
		self.playerPos = data.get('player1Y')
		self.botPos = data.get('player2Y')
		self.ballPosX = data.get('ballX')
		self.ballPosY = data.get('ballY')
		self.ballSpeedX = data.get('ballSpeedX')
		self.ballSpeedY = data.get('ballSpeedY')
		self.acceleration = data.get('acceleration')
		ballPos = self.calculatePaddlePos(self.ballPosX, self.ballPosY, self.ballSpeedX, self.ballSpeedY)
		ballPos = self.getBestMove(ballPos)
		if (self.ballSpeedX < 0):
			sleepTime = self.ballPosX / (-200 * self.ballSpeedX) + 0.2
			if (sleepTime < 1):
				sleepTime = 1
		else:
			sleepTime = (2 - self.ballPosX) / (200 * self.ballSpeedX) + 0.2
			if (sleepTime < 1):
				sleepTime = 1
		ballPos = ballPos + (2 * random.random() - 1) / 20
		if (self.ballSpeedX < 0):
			await self.send(text_data=json.dumps({'Move': 'NoMove', 'destY': 0, 'SleepTime': 1}))
		elif (self.botPos > ballPos):
			await self.send(text_data=json.dumps({'Move': 'ArrowUp', 'destY': ballPos, 'SleepTime': sleepTime}))
		else:
			await self.send(text_data=json.dumps({'Move': 'ArrowDown', 'destY': ballPos, 'SleepTime': sleepTime}))


	def calculatePaddlePos(self, ballX, ballY, ballSpeedX, ballSpeedY):
		inter = self.interTop(ballX, ballY, ballSpeedX, ballSpeedY)
		if (inter != -1):
			return (self.calculatePaddlePos(inter, 0.05, ballSpeedX, -ballSpeedY))
		inter = self.interBot(ballX, ballY, ballSpeedX, ballSpeedY)
		if (inter != -1):
			return (self.calculatePaddlePos(inter, 0.95, ballSpeedX, -ballSpeedY))
		inter = self.interPaddle(ballX, ballY, ballSpeedX, ballSpeedY)
		if (inter != -1):
			return (inter)
		inter = self.interPlayer(ballX, ballY, ballSpeedX, ballSpeedY)
		if (inter != -1):
			return (inter)
		return (0.5)

	def interTop(self, ballX, ballY, ballSpeedX, ballSpeedY):
		if (ballSpeedY >= 0):
			return (-1)
		interX = (ballSpeedX * -ballY) / ballSpeedY + ballX
		if (interX >= 0 and interX <= 1):
			if (interX >= 0 and interX <= 0.01 and ballSpeedX < 0):
				return (0)
			if (interX <= 1 and interX >= 0.99 and ballSpeedX > 0):
				return (1)
			return (interX)
		return (-1)
	
	def interBot(self, ballX, ballY, ballSpeedX, ballSpeedY):
		if (ballSpeedY <= 0):
			return (-1)
		interX = (ballSpeedX * (1 - ballY)) / ballSpeedY + ballX
		if (interX >= 0 and interX <= 1):
			if (interX >= 0 and interX <= 0.01 and ballSpeedX < 0):
				return (0)
			if (interX <= 1 and interX >= 0.99 and ballSpeedX > 0):
				return (1)
			return (interX)
		return (-1)

	def interPaddle(self, ballX, ballY, ballSpeedX, ballSpeedY):
		if (ballSpeedX <= 0):
			return (-1)
		interY = (ballSpeedY * (0.95 - ballX)) / ballSpeedX + ballY
		if (interY >= 0.95):
			return (1)
		if (interY <= 0.05):
			return (0)
		return (interY)

	def interPlayer(self, ballX, ballY, ballSpeedX, ballSpeedY):
		if (ballSpeedX >= 0):
			return (-1)
		interY = (ballSpeedY * (0.05 - ballX)) / ballSpeedX + ballY
		if (interY >= 0.95):
			return (1)
		if (interY <= 0.05):
			return (0)
		return (interY)

	def getBestMove(self, exact):
		stock = abs(self.calculateNextInter(exact - 0.06, exact) - self.playerPos)
		bestMove = exact - 0.06
		new = abs(self.calculateNextInter(exact, exact) - self.playerPos)
		if (new > stock):
			stock = new
			bestMove = exact
		new = abs(self.calculateNextInter(exact + 0.06, exact) - self.playerPos)
		if (new > stock):
			stock = new
			bestMove = exact + 0.06
		return (bestMove)

	def calculateNextInter(self, botPos, ballY):
		newBallSpeedX = -abs(self.ballSpeedX) * self.acceleration
		newBallSpeedY = (ballY - botPos) * 8 * abs(self.ballSpeedX)
		value = self.calculatePaddlePos(0.95, ballY, newBallSpeedX, newBallSpeedY)
		return (value)
