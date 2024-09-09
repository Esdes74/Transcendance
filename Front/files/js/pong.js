const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth; // Rendre responsive

const paddleWidth = 10;	//eppaisseur bar
const paddleHeight = 100; // hauteur bar
const ballRadius = 10;	//taille de la balle

let paddle1Y = (canvas.height - paddleHeight) / 2;	//player 1
let paddle2Y = paddle1Y ;							//player 2

let ballX = canvas.width / 2;	//placer la balle au milieu horizontal du canvas
let ballY = canvas.height / 2;	//placer la balle au milieu verticalement du canvas
let ballSpeedX = 3;
let ballSpeedY = 3;
const paddleSpeed = 5;
const paddleBuffer = 5; // Buffer pour l'écart des raquettes au bord

// Suivi des touches enfoncées
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Dessiner raquettes et balle
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  // Raquettes
  ctx.fillRect(paddleBuffer, paddle1Y, paddleWidth, paddleHeight);
  ctx.fillRect(canvas.width - paddleWidth - paddleBuffer, paddle2Y, paddleWidth, paddleHeight);
  // Balle
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();
}

// Déplacer les raquettes
function updatePaddles() {
  if (keys['w'] && paddle1Y > 0) paddle1Y -= paddleSpeed + 1;
  if (keys['s'] && paddle1Y < canvas.height - paddleHeight) paddle1Y += paddleSpeed;
  if (keys['ArrowUp'] && paddle2Y > 0) paddle2Y -= paddleSpeed;
  if (keys['ArrowDown'] && paddle2Y < canvas.height - paddleHeight) paddle2Y += paddleSpeed;
}

// Gérer les mouvements et collisions de la balle
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Rebondir sur le haut et le bas du canvas
  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) ballSpeedY = -ballSpeedY;

  // Détection de collision avec les raquettes
  if (ballX - ballRadius < paddleWidth + paddleBuffer && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) {
	ballSpeedX = Math.abs(ballSpeedX); // Rebond immédiat
  }
  if (ballX + ballRadius > canvas.width - paddleWidth - paddleBuffer && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) {
	ballSpeedX = -Math.abs(ballSpeedX); // Rebond immédiat
  }

  // Réinitialiser la balle si elle sort du terrain
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
  }
}

// Boucle principale du jeu
function gameLoop() {
  draw();
  updateBall();
  updatePaddles();
  requestAnimationFrame(gameLoop);
}

gameLoop();
