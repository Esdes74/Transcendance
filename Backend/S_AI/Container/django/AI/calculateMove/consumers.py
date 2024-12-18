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
		if (data.get('ballSpeedX') < 0):
			await self.send(text_data=json.dumps({'Move': 'NoMove'}))
		elif (data.get('player2Y') < data.get('ballY') + 0.05 and data.get('player2Y') > data.get('ballY') - 0.05):
			await self.send(text_data=json.dumps({'Move': 'NoMove'}))
		elif (data.get('player2Y') > data.get('ballY') + 0.05):
			await self.send(text_data=json.dumps({'Move': 'ArrowUp'}))
		else:
			await self.send(text_data=json.dumps({'Move': 'ArrowDown'}))
