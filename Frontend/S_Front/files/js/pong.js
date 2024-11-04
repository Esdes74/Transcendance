const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const playerWidth = 10;			// Epaisseur players
const playerHeight = 0.30 * canvas.height;			// Hauteur players
const ballRadius = 8;				// Taille de la ball
let printBall = true;			// Afficher la ball ou non

let player1X = 0.05
let player2X = 1 - player1X
let player1Y = (canvas.height - playerHeight) / 2;	//player 1
let player2Y = player1Y;							//player 2

let scorePlayer1 = 0;				// score player 1
let scorePlayer2 = 0;				// score player 2

const scorePlayer1Elem = document.getElementById('scorePlayer1');
const scorePlayer2Elem = document.getElementById('scorePlayer2');

let ballX = 0.5;		// Placer la ball au milieu horizontal du canvas	en pourcentage
let ballY = 0.5;	// Placer la ball au milieu verticalement du canvas	en pourcentage

let ballSpeed = 0.01;				// Vitesse de la ball par défaut
let ballSpeedX = 0.01;				// Vitesse de la ball X
let ballSpeedY = 0.01;				// Vitesse de la ball Y
const MAX_SPEED = 16;				// Vitesse max de la ball
const acceleration = 1.1;			// Vitesse multiplie a chaque renvoi

// const playerSpeed = 5;			// Vitesse des players
const playerBuffer = 0.05 * canvas.width;			// Ecart des players au bord

canvas.width = canvas.clientWidth; // Rendre responsive


// ################################################################################################################ //
// 												Connexion WebSocket													//
// ################################################################################################################ //

const socket = new WebSocket('ws://localhost:8000/ws/pong/');

// Gestion de l'ouverture de la connexion WebSocket
socket.onopen = function (e) {
	console.log("WebSocket is connected ouais");
};

// Gestion de la réception de messages WebSocket
socket.onmessage = function (e) {
	// console.log('Message from server il dit :', event.data);
	const data = JSON.parse(e.data);
	
	// Mise à jour des positions reçues du serveur
	if (data.type === 'pong.player1') {
		player1Y = data.player1Y * canvas.height - playerHeight / 2;
	}
	if (data.type === 'pong.player2') {
		player2Y = data.player2Y * canvas.height - playerHeight / 2;
	}
	if (data.type === 'pong.ball') {
		ballX = data.ballX * canvas.width;
		ballY = data.ballY * canvas.height;
		ballSpeedX = data.ballSpeedX;
		ballSpeedY = data.ballSpeedY;
		scorePlayer1 = data.scorePlayer1;
		scorePlayer2 = data.scorePlayer2;
		scorePlayer1Elem.textContent = scorePlayer1;
		scorePlayer2Elem.textContent = scorePlayer2;

		console.log('ballX:', ballX);
		console.log('ballY:', ballY);
		console.log('ballSpeedX:', ballSpeedX);
		console.log('ballSpeedY:', ballSpeedY);
	}
};

// Gestion des erreurs WebSocket
socket.onerror = function (error) {
	console.error('WebSocket error la big erreur la:', error);
};

// Gestion de la fermeture de la connexion WebSocket
socket.onclose = function (event) {
	console.log('WebSocket is closed bah il sest ferme:', event);
};

// ################################################################################################################ //
// 												Connexion WebSocket													//
// ################################################################################################################ //



// Suivi des touches enfoncées (pour mobilité + fluide)
// const keys = {};
// // Je veux que toutes les changements d'état des keys soient envoyées au serveur
// document.addEventListener('keydown', e => {
	// 	console.log('key pressed:', e.key);
	// 	keys[e.key] = true;
	// 	// Envoyer l'action de mouvement au serveur
	// 	// if (['w', 's'].includes(e.key)) {
		// 	// 	socket.send(JSON.stringify({
			// 	// 		'type': 'pong.move',
			// 	// 		'key': e.key
			// 	// 	}));
			// 	// }
			// 	// if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
				// 	// 	socket.send(JSON.stringify({
					// 	// 		'type': 'pong.move',
					// 	// 		'key': e.key
					// 	// 	}));
					// 	// }
					
// 	for (let key in keys) {
// 		if (keys[key] === true && ['w', 's', 'ArrowUp', 'ArrowDown'].includes(key)) {
	// 			socket.send(JSON.stringify({
// 				'type': 'pong.move',
// 				'key': key
// 			}));
// 		}
// 	}
// });
// document.addEventListener('keyup', e => {
	// 	keys[e.key] = false;
	// });
	
	//Quand une touche est pressée, on envoie un message au serveur
document.addEventListener('keydown', e => {
	if (socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify({
			'type': 'key.pressed',
			'key': e.key
	}));
	}
});

//Quand une touche est relaché, on envoie un message au serveur
document.addEventListener('keyup', e => {
	if (socket.readyState === WebSocket.OPEN) {
	socket.send(JSON.stringify({
		'type': 'key.released',
		'key': e.key
	}));
	}
});


// setInterval(() => {
// 	socket.send(JSON.stringify({
// 		'type': 'pong.move',
// 		}));
// }, 15);

socket.addEventListener('open', () => {
    setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                'type': 'pong.ball',
            }));
        }
    }, 20);
});

// setInterval(() => {
// 	socket.send(JSON.stringify({
// 			'type': 'pong.ball',
// 				}));
// 			}, 1000);
// 			const keys = {};
			
			// document.addEventListener('keydown', e => {
				//     // console.log('key pressed:', e.key);
				
//     keys[e.key] = true;
// });

// document.addEventListener('keyup', e => {
// 	// console.log('key released:', e.key);
//     keys[e.key] = false;
// });

// Envoyer l'état des touches au serveur à intervalles réguliers


// Dessiner players et ball
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	// Players
	ctx.fillRect(playerBuffer, player1Y, playerWidth, playerHeight);
	ctx.fillRect(canvas.width - playerWidth - playerBuffer, player2Y, playerWidth, playerHeight);
	// Ball
	if (printBall == true) {
		ctx.beginPath();
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
		ctx.fill();
	}
}

// Gérer les mouvements et collisions de la balle
// function updateBall() {
// 	// Limiter la vitesse de la balle
// 	if (Math.abs(ballSpeedX) > MAX_SPEED)
// 		ballSpeedX = (ballSpeedX > 0 ? 1 : -1) * MAX_SPEED;

// 	// Rebondir sur le haut et le bas du terrain
// 	if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) ballSpeedY = -ballSpeedY;

// 	// Détection de collision avec les raquettes
// 	if (ballX - ballRadius < player1X /*playerWidth + playerBuffer*/ && ballY > player1Y && ballY < player1Y + playerHeight)
// 		ballSpeedX = Math.abs(ballSpeedX) * acceleration;	// Rebond immédiat
// 	if (ballX + ballRadius > canvas.width - playerWidth - playerBuffer && ballY > player2Y && ballY < player2Y + playerHeight)
// 		ballSpeedX = -Math.abs(ballSpeedX) * acceleration;	// Rebond immédiat
// }

// Boucle du jeu
function gameLoop() {
	draw();
	// updateBall();
	requestAnimationFrame(gameLoop);
}

gameLoop();
