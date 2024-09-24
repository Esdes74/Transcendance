import json
from channels.generic.websocket import WebsocketConsumer

class PongConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        data = json.loads(text_data)

        # Simuler la gestion des messages reçus depuis le client
        if data['type'] == 'pong.move':
            # Ici, on pourrait traiter les mouvements des joueurs
            self.send(text_data=json.dumps({
                'type': 'pong.update',
                'message': 'Player moved'
            }))
