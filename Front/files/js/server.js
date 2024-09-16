const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let players = [];

wss.on('connection', (ws) => {
	players.push(ws);
	const playerNumber = players.length;
	console.log(`Player ${playerNumber} connected`);

	// Envoyer le numéro du joueur au client
	ws.send(JSON.stringify({ type: 'player', player: playerNumber }));

	// Diffuser les mouvements des joueurs aux deux clients
	ws.on('message', (data) => {
		const message = JSON.parse(data);

		if (message.type === 'move') {
			players.forEach((player, index) => {
				if (player !== ws) {
					player.send(JSON.stringify({
						type: 'move',
						player: message.player,
						y: message.y
					}));
				}
			});
		}
	});

	ws.on('close', () => {
		console.log(`Player ${playerNumber} disconnected`);
		players = players.filter(player => player !== ws);
	});
});

console.log('Server is running on ws://localhost:8080');
