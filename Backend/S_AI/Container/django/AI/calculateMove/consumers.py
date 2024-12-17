import json
from channels.generic.websocket import AsyncWebsocketConsumer

class myConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print('ouuueeeee')
		await self.accept()

	async def disconnect(self, close_code):
		pass
	async def receive(self, text_data):
		text_data_json = json.loads(text_data)
		print(text_data_json)
