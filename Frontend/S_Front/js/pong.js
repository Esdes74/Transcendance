const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');


// paddle properties

const	paddleWidth = 10;							// Epaisseur players
const	paddleHeight = 0.30 * canvas.height;		// Hauteur players
const	paddleBuffer = 0.02 * canvas.width;			// Ecart des players au bord
// let		paddle1Y;
// let		paddle2Y;
let paddle1Y = (canvas.height - paddleHeight) / 2;	//player 1
let paddle2Y = paddle1Y;							//player 2


//  ball properties

const	ballRadius = 8;								// Taille de la ball
let		printBall = false;							// Afficher la ball ou non
let		ballX = 0.5 * canvas.width;					// Placer la ball au milieu horizontal du canvas	en pourcentage
let		ballY = 0.5 * canvas.height;				// Placer la ball au milieu verticalement du canvas	en pourcentage


// game properties

let		scorePlayer1 = 0;							// score player 1
let		scorePlayer2 = 0;							// score player 2

const	scorePlayer1Elem = document.getElementById('scorePlayer1');
const	scorePlayer2Elem = document.getElementById('scorePlayer2');

let		websocketLock = false;
let		countdownActive = false;					// Variable pour suivre l'état du compte à rebours
let		countdownValue = 0;							// Valeur actuelle du compte à rebours



window.addEventListener('resize', resizeCanvas);

function resizeCanvas()								// Rendre responsive
{
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
	draw();
}

resizeCanvas();

// ################################################################################################################ //
// 												Connexion WebSocket													//
// ################################################################################################################ //

const socket = new WebSocket('ws://localhost:8000/ws/pong/');


/// Gestion de l'ouverture de la connexion WebSocket \\\

socket.onopen = async function (e)
{
	console.log("WebSocket is connected ouais");
	startCountdown(3);
	gameLoop();
};


async function sendMessage(data)
{
	if (websocketLock)
	{
		return;
	}
	websocketLock = true;
	if (socket.readyState === WebSocket.OPEN)
	{
		socket.send(JSON.stringify(data));
	}
	
	websocketLock = false;
}


/// Gestion de la réception de messages WebSocket \\\

socket.onmessage = function (e)
{
	const data = JSON.parse(e.data);
	if (data.type === 'pong.update')
	{
		paddle1Y = data.player1Y * canvas.height - paddleHeight / 2;
		paddle2Y = data.player2Y * canvas.height - paddleHeight / 2;
		ballX = data.ballX * canvas.width;
		ballY = data.ballY * canvas.height;
		scorePlayer1 = data.scorePlayer1;
		scorePlayer2 = data.scorePlayer2;
		scorePlayer1Elem.textContent = scorePlayer1;
		scorePlayer2Elem.textContent = scorePlayer2;
		printBall = data.action;
		if (printBall == false)
		{
			console.log('scorePlayer1:', scorePlayer1);
			console.log('scorePlayer2:', scorePlayer2);
			if (scorePlayer1 >= 5 || scorePlayer2 >= 5)
				gameOver();
		}
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


//Quand une touche est pressée, on envoie un message au serveur
document.addEventListener('keydown', e => {
	if (socket.readyState === WebSocket.OPEN && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'w' || e.key === 's')) {
		console.log(`Key pressed: ${e.key}`);
		sendMessage({
			'type': 'key.pressed',
			'key': e.key
		});
	}
});

//Quand une touche est relaché, on envoie un message au serveur
document.addEventListener('keyup', e => {
	if (socket.readyState === WebSocket.OPEN && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'w' || e.key === 's')) {
		console.log(`Key released: ${e.key}`);
		sendMessage({
			'type': 'key.released',
			'key': e.key
		});
	}
});


function gameOver()
{
	const winMessageElem = document.getElementById('winMessage');
	if (scorePlayer1 > scorePlayer2)
	{
		winMessageElem.textContent = 'Player 1 wins!';
	}
	else
	{
		winMessageElem.textContent = 'Player 2 wins!';
	}
	winMessageElem.style.display = 'block';  // Rendre visible l'encadré

	const replayBlockElem = document.getElementById('replayBlock');
	replayBlockElem.style.display = 'block';

	document.getElementById('YES').addEventListener('click', function()
	{
		location.reload(); // Recharger la page pour rejouer
	});

	document.getElementById('SETTING').addEventListener('click', function()
	{
		window.location.href = 'settings.html'; // Rediriger vers la page des paramètres
	});

	document.getElementById('BTH').addEventListener('click', function()
	{
		window.location.href = 'index.html'; // Rediriger vers la page d'accueil
	});
}

// Fonction pour démarrer le compte à rebours
function startCountdown(seconds)
{
	countdownActive = true;
	countdownValue = seconds;

	const interval = setInterval(() =>
	{
		countdownValue--;
		if (countdownValue <= 0)
		{
			clearInterval(interval);
			countdownActive = false;
			printBall = true;
			console.log('GO !');
		}
	}, 1000);
}

// Dessiner players et ball
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = 'white';
	
	// Ligne filet
	ctx.setLineDash([15, 10]);														// Définir le motif de pointillé (10 pixels de trait, 10 pixels d'espace)
	ctx.beginPath();
	ctx.moveTo(canvas.width / 2, 0);
	ctx.lineTo(canvas.width / 2, canvas.height);
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.setLineDash([]);

	ctx.fillRect(canvas.width / 6, canvas.height / 2, canvas.width * 2/3, 2);		// ligne médiane de service

	ctx.fillRect(canvas.width / 6, canvas.height / 6, 2, canvas.height * 2/3);		// ligne perpendiculaire a la lgine médiane du service sur l'extremité de gauche et qui monte jusquau terrain
	ctx.fillRect(5 * canvas.width / 6, canvas.height / 6, 2, canvas.height * 2/3);	// ligne perpendiculaire a la lgine médiane du service sur l'extremité de droite et qui monte jusquau terrain
	ctx.fillRect(0, canvas.height / 6, canvas.width, 2);							// ligne de coté reliant les deux bouts du terrain et passant par les lignes perpendiculaires en leur extremité hautes
	ctx.fillRect(0, 5 * canvas.height / 6, canvas.width, 2);						// ligne de coté reliant les deux bouts du terrain et passant par les lignes perpendiculaires en leur extremité hautes


	// Players
	ctx.fillRect(paddleBuffer, paddle1Y, paddleWidth, paddleHeight);
	ctx.fillRect(canvas.width - paddleWidth - paddleBuffer, paddle2Y, paddleWidth, paddleHeight);

	// Ball
	if (printBall == true)
	{
		ctx.beginPath();
		ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
		ctx.fill();
	}

	// Dessiner le compte à rebours si actif
	if (countdownActive) {
		ctx.strokeStyle = 'rgb(115, 171, 201)';										// Couleur du contour
		ctx.lineWidth = 28;															// Largeur du contour
		ctx.strokeText(countdownValue, canvas.width / 2, canvas.height / 2);
		ctx.font = '70px Sans-serif';
		ctx.fillStyle = 'white';

		// centrer en x et y
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(countdownValue, canvas.width / 2, canvas.height / 2);
	}
}

// Boucle du jeu
function gameLoop()
{
	draw();
	requestAnimationFrame(gameLoop);
}
