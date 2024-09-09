const	canvas = document.getElementById('pongCanvas');
const	ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth; // Rendre responsive

const	playerWidth = 10;		// Epaisseur players
const	playerHeight = 100;	// Hauteur players
const	ballRadius = 10;		// Taille de la ball

let	player1Y = (canvas.height - playerHeight) / 2;	//player 1
let	player2Y = player1Y ;							//player 2

let		ballX = canvas.width / 2;	// Placer la ball au milieu horizontal du canvas
let		ballY = canvas.height / 2;	// Placer la ball au milieu verticalement du canvas
let		ballSpeedX = 3;				// Vitesse de la ball X
let		ballSpeedY = 3;				// Vitesse de la ball Y
const	playerSpeed = 5;			// Vitesse des players
const	playerBuffer = 5;			// Ecart des players au bord

// Suivi des touches enfoncées (pour mobilité + fluide)
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Dessiner players et ball
function draw()
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	// Players
	ctx.fillRect(playerBuffer, player1Y, playerWidth, playerHeight);
	ctx.fillRect(canvas.width - playerWidth - playerBuffer, player2Y, playerWidth, playerHeight);
	// Balle
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	ctx.fill();
}

// Déplacer les bars
function updatePlayers()
{
	if (keys['w'] && player1Y > 0) player1Y -= playerSpeed + 1;
	if (keys['s'] && player1Y < canvas.height - playerHeight) player1Y += playerSpeed;
	if (keys['ArrowUp'] && player2Y > 0) player2Y -= playerSpeed;
	if (keys['ArrowDown'] && player2Y < canvas.height - playerHeight) player2Y += playerSpeed;
}

// Gérer les mouvements et collisions de la balle
function updateBall()
{
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	// Rebondir sur le haut et le bas du canvas
	if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) ballSpeedY = -ballSpeedY;

	// Détection de collision avec les raquettes
	if (ballX - ballRadius < playerWidth + playerBuffer && ballY > player1Y && ballY < player1Y + playerHeight)
		ballSpeedX = Math.abs(ballSpeedX); // Rebond immédiat

	if (ballX + ballRadius > canvas.width - playerWidth - playerBuffer && ballY > player2Y && ballY < player2Y + playerHeight)
		ballSpeedX = -Math.abs(ballSpeedX); // Rebond immédiat

	// Réinitialiser la balle si elle sort du terrain
	if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0)
	{
		ballX = canvas.width / 2;
		ballY = canvas.height / 2;
	}
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
