const	canvas = document.getElementById('pongCanvas');
const	ctx = canvas.getContext('2d');

const	playerWidth = 10;			// Epaisseur players
const	playerHeight = 100;			// Hauteur players
const	ballRadius = 8;				// Taille de la ball

let		player1Y = (canvas.height - playerHeight) / 2;	//player 1
let		player2Y = player1Y ;							//player 2

let		scorePlayer1 = 0;				// score player 1
let		scorePlayer2 = 0;				// score player 2

const	scorePlayer1Elem = document.getElementById('scorePlayer1');
const	scorePlayer2Elem = document.getElementById('scorePlayer2');

let		ballX = canvas.width / 2;	// Placer la ball au milieu horizontal du canvas
let		ballY = canvas.height / 2;	// Placer la ball au milieu verticalement du canvas

let		printBall = true;			// Afficher la ball ou non


const	playerSpeed = 5;			// Vitesse des players
const	playerBuffer = 10;			// Ecart des players au bord

let		ballSpeed = 3;				// Vitesse de la ball par défaut
let		ballSpeedX = 3;				// Vitesse de la ball X
let		ballSpeedY = 3;				// Vitesse de la ball Y
const	MAX_SPEED = 16;				// Vitesse max de la ball
const	acceleration = 1.1;			// Vitesse multiplie a chaque renvoi

canvas.width = canvas.clientWidth; // Rendre responsive

// Connexion WebSocket
const socket = new WebSocket('ws://localhost:8080');


// Suivi des touches enfoncées (pour mobilité + fluide)
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Écouter les messages WebSocket pour les mouvements des joueurs et la position de la balle
socket.addEventListener('message', (event) => {
	const message = JSON.parse(event.data);

	if (message.type === 'move') {
	  if (message.player === 1) {
		player1Y = message.y;
	  } else if (message.player === 2) {
		player2Y = message.y;
	  }
	}

	// if (message.type === 'ball') {
	// 	ballX = message.x;
	// 	ballY = message.y;
	// 	scorePlayer1Elem.textContent = message.scorePlayer1;
	// 	scorePlayer2Elem.textContent = message.scorePlayer2;
	// }
  });


// Dessiner players et ball
function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	// Players
	ctx.fillRect(playerBuffer, player1Y, playerWidth, playerHeight);
	ctx.fillRect(canvas.width - playerWidth - playerBuffer, player2Y, playerWidth, playerHeight);
	
	// Ball
	if (printBall == true)
		{
			ctx.beginPath();
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
		ctx.fill();
	}
}

// Déplacer les players
function updatePlayers()
{
		// Player 1 (utilise les touches 'w' et 's')
		if (keys['w'] && player1Y > 0) {
		  player1Y -= playerSpeed;
		  socket.send(JSON.stringify({ type: 'move', player: 1, y: player1Y }));
		}
		if (keys['s'] && player1Y < canvas.height - playerHeight) {
		  player1Y += playerSpeed;
		  socket.send(JSON.stringify({ type: 'move', player: 1, y: player1Y }));
		}
	  
		// Player 2 (utilise les touches fléchées)
		if (keys['ArrowUp'] && player2Y > 0) {
		  player2Y -= playerSpeed;
		  socket.send(JSON.stringify({ type: 'move', player: 2, y: player2Y }));
		}
		if (keys['ArrowDown'] && player2Y < canvas.height - playerHeight) {
		  player2Y += playerSpeed;
		  socket.send(JSON.stringify({ type: 'move', player: 2, y: player2Y }));
		}
}

// Gérer les mouvements et collisions de la balle
function updateBall()
{
	ballX += ballSpeedX;
	ballY += ballSpeedY;

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

	// Réinitialiser la balle si elle sort du terrain
	if (ballX + ballRadius > canvas.width)	// Joueur 1 marque
	{
		scorePlayer1++;
		scorePlayer1Elem.textContent = scorePlayer1;
		if (scorePlayer1 < 5)
			resetBall(-1);					// Renvoyer la balle vers la gauche
		else
			gameOver();
	}
	if	(ballX - ballRadius < 0)			// Joueur 2 marque
	{
		scorePlayer2++;
		scorePlayer2Elem.textContent = scorePlayer2;
		if (scorePlayer2 < 5)
			resetBall(1);						// Renvoyer la balle vers la gauche
		else
			gameOver();
	}
}

function resetBall(direction)		// Direction = 1 ou -1
{
	ballX = canvas.width / 2;		// Remettre la ball au centre
	ballY = canvas.height / 2;
	ballSpeedX = 0;					// Arrêter la balle
	ballSpeedY = 0;
	printBall = false;				// Cacher la balle
	
	// Après 0.9 seconde, reafficher la balle
	setTimeout(() => {
		printBall = true; 			// Réafficher la balle
	}, 900);
	
	// Après 1 seconde, relancer la balle dans la direction donnée
	setTimeout(() => {
		ballSpeedX = direction * ballSpeed;
		ballSpeedY = ballSpeed;
	}, 1000);
}

function gameOver()
{
	ballX = canvas.width / 2;		// Remettre la ball au centre
	ballY = canvas.height / 2;
	ballSpeedX = 0;					// Arrêter la balle
	ballSpeedY = 0;
	printBall = false;

	const winMessageElem = document.getElementById('winMessage');
	if (scorePlayer1 > scorePlayer2) {
		winMessageElem.textContent = 'Player 1 wins!';
	} else {
		winMessageElem.textContent = 'Player 2 wins!';
	}
	winMessageElem.style.display = 'block';  // Rendre visible l'encadré

	const replayBlockElem = document.getElementById('replayBlock');
	replayBlockElem.style.display = 'block';


}

// Boucle du jeu
function gameLoop()
{
	draw();
	updateBall();
	updatePlayers();
	requestAnimationFrame(gameLoop);
}

gameLoop();
