let canvas = document.getElementById('pongCanvas');
let ctx = canvas.getContext('2d');

let playerWidth = 10;			// Epaisseur players
let playerHeight = 100;			// Hauteur players
let ballRadius = 8;				// Taille de la ball
let printBall = true;			// Afficher la ball ou non

let player1Y = (canvas.height - playerHeight) / 2;	//player 1
let player2Y = player1Y;							//player 2

let scorePlayer1 = 0;				// score player 1
let scorePlayer2 = 0;				// score player 2

let scorePlayer1Elem = document.getElementById('scorePlayer1');
let scorePlayer2Elem = document.getElementById('scorePlayer2');

let ballX = canvas.width / 2;	// Placer la ball au milieu horizontal du canvas
let ballY = canvas.height / 2;	// Placer la ball au milieu verticalement du canvas

let ballSpeed = 3;				// Vitesse de la ball par défaut
let ballSpeedX = 3;				// Vitesse de la ball X
let ballSpeedY = 3;				// Vitesse de la ball Y
let MAX_SPEED = 16;				// Vitesse max de la ball
let acceleration = 1.1;			// Vitesse multiplie a chaque renvoi

// const playerSpeed = 5;			// Vitesse des players
let playerBuffer = 10;			// Ecart des players au bord

canvas.width = canvas.clientWidth; // Rendre responsive



// Suivi des touches enfoncées (pour mobilité + fluide)
let keys = {};
document.addEventListener('keydown', e => {
	keys[e.key] = true;

	// Envoyer l'action de mouvement au serveur
	if (['w', 's', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
		socket.send(JSON.stringify({
			'type': 'pong.move',
			'key': e.key
		}));
	}
});
document.addEventListener('keyup', e => keys[e.key] = false);

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
function updateBall() {
	// Limiter la vitesse de la balle
	if (Math.abs(ballSpeedX) > MAX_SPEED)
		ballSpeedX = (ballSpeedX > 0 ? 1 : -1) * MAX_SPEED;

	// Rebondir sur le haut et le bas du terrain
	if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) ballSpeedY = -ballSpeedY;

	// Détection de collision avec les raquettes
	if (ballX - ballRadius < playerWidth + playerBuffer && ballY > player1Y && ballY < player1Y + playerHeight)
		ballSpeedX = Math.abs(ballSpeedX) * acceleration;	// Rebond immédiat
	if (ballX + ballRadius > canvas.width - playerWidth - playerBuffer && ballY > player2Y && ballY < player2Y + playerHeight)
		ballSpeedX = -Math.abs(ballSpeedX) * acceleration;	// Rebond immédiat
}

// Boucle du jeu
function gameLoop() {
	draw();
	requestAnimationFrame(gameLoop);
}

gameLoop();
