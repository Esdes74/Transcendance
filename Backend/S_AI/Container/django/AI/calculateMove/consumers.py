import json
from channels.generic.websocket import AsyncWebsocketConsumer
import logging

class myConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		await self.accept()

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
		botPos = data.get('player2Y')
		ballPosX = data.get('ballX')
		ballPos = data.get('ballY')
		ballPosY = data.get('ballY')
		ballSpeedX = data.get('ballSpeedX')
		ballSpeedY = data.get('ballSpeedY')
		if (ballSpeedX < 0):
			sleepTime = ballPosX / (-100 * ballSpeedX) + 0.1
			if (sleepTime < 1):
				sleepTime = 1
		else:
			sleepTime = (2 - ballPosX) / (100 * ballSpeedX) + 0.1
			if (sleepTime < 1):
				sleepTime = 1
		ballPos = self.calculatePaddlePos(ballPosX, ballPosY, ballSpeedX, ballSpeedY)
		if (ballSpeedX < 0):
			#if (ballPosX < 0.25):
		#				predict movement here!
			if (botPos < 0.5):
				await self.send(text_data=json.dumps({'Move': 'ArrowDown', 'Timing': 0.5 - botPos, 'SleepTime': sleepTime}))
			else:
				await self.send(text_data=json.dumps({'Move': 'ArrowUp', 'Timing': botPos - 0.5, 'SleepTime': sleepTime}))
		elif (botPos < ballPos + 0.05 and botPos > ballPos - 0.05):
			await self.send(text_data=json.dumps({'Move': 'NoMove', 'Timing': 0, 'SleepTime': 1}))
		elif (botPos > ballPos + 0.05):
			await self.send(text_data=json.dumps({'Move': 'ArrowUp', 'Timing': botPos - ballPos, 'SleepTime': sleepTime}))
		else:
			await self.send(text_data=json.dumps({'Move': 'ArrowDown', 'Timing': ballPos - botPos, 'SleepTime': sleepTime}))


	def calculatePaddlePos(self, ballX, ballY, ballSpeedX, ballSpeedY):
		value = self.interTop(ballX, ballY, ballSpeedX, ballSpeedY)
		if (value != -1):
			return (self.calculatePaddlePos(value, 0.05, ballSpeedX, -ballSpeedY))
		value1 = self.interBot(ballX, ballY, ballSpeedX, ballSpeedY)
		if (value1 != -1):
			return (self.calculatePaddlePos(value1, 0.95, ballSpeedX, -ballSpeedY))
	#	if (value2 != -1):
	#		return (value2)#randomizeResult(value2))
		value3 = self.interPaddle2(ballX, ballY, ballSpeedX, ballSpeedY)
		if (value3 != -1):
			return (value3)
			#return (randomizeResult(value3, paddleHeight, height))
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

	def interPaddle2(self, ballX, ballY, ballSpeedX, ballSpeedY):
		if (ballSpeedX <= 0):
			return (-1)
		interY = (ballSpeedY * (0.95 - ballX)) / ballSpeedX + ballY
		if (interY >= 0.95):
			return (0.95)
		if (interY <= 0.05):
			return (0.05)
		return (interY)
