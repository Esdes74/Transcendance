import asyncio
import websockets
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class CalculConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		print('Connecté')
		await self.accept()
		self.player1Y = 200

	async def disconnect(self, close_code):
		pass

	async def receive(self, text_data):
		data = json.loads(text_data)

		# Vérifier si le message contient la configuration
		if data.get('type') == 'config':
			self.player1Y = data['player1Y']
			# self.player2Y = data['player2Y']
			# self.ballX = data['ballX']
			# self.ballY = data['ballY']
			# self.scorePlayer1 = data['scorePlayer1']
			# self.scorePlayer2 = data['scorePlayer2']
			print(f"Configuration reçue: {data}")
		
		elif data.get('type') == 'pong.move':
			# afficher le message reçu
			print(f"pong.move donc : {data}")

			key = data['key']

			# afficher valeur de player1Y avant le mouvement
			print(f"player1Y avant : {self.player1Y}") 
			if key == 'arrowUp':
				self.player1Y += self.player1Y - 10
			elif key == 'ArrowDown':
				self.player1Y += 10
			# afficher valeur de player1Y apres le mouvement
			print(f"player1Y apres : {self.player1Y}")

		# Retourner les nouvelles valeurs
		await self.send(text_data=json.dumps({
			'type': 'pong.update',
			'player1Y': self.player1Y,
			# 'player2Y': player2Y,
			# 'ballX': ballX,
			# 'ballY': ballY,
			# 'scorePlayer1': scorePlayer1,
			# 'scorePlayer2': scorePlayer2
		}))
		# afficher player1Y renvoyé
		print(f"player1Y renvoyé : {self.player1Y}")
		await self.close()

		# data = json.loads(text_data)
		# print(f"API reçuu : {text_data}")

		# Traitez le message ici (par exemple, mises à jour du jeu)
		# response = f"Réponse du service Pong : {data[::-1]}"  # Exemple de traitement
		# await self.send(text_data=f"The one piece is real : {text_data}")




# if data['type'] == 'pong.move':
# 			key = data['key']
			
# 			#gerer les mouvements
# 			if key == 'ArrowUp':
# 				await self.send(text_data=json.dumps({
# 					'type': 'pong.update',
# 					'message': 'Player moved up'
# 				}))
# 				print('Player moved up')
# 			if key == 'ArrowDown':
# 				await self.send(text_data=json.dumps({
# 					'type': 'pong.update',
# 					'message': 'Player moved down'
# 				}))
# 				print('Player moved down')
