from channels.generic.websocket import WebsocketConsumer
import json

class MyConsumer(WebsocketConsumer):
	def connect(self):
		print('connected')
		self.accept()  # Accepte la connexion WebSocket
	def disconnect(self, close_code):
		pass  # Gère la fermeture de la connexion

	def receive(self, text_data):
		data = json.loads(text_data)
		message = data['message']
		# Envoie un message de retour au client WebSocket
		self.send(text_data=json.dumps({
			'message': f"Message reçu : {message}"
		}))
