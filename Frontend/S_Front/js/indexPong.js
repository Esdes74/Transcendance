function initPong()
{
	
	const gameSettings = {
		canvas: document.getElementById('pongCanvas'),
		// paddle properties
		paddleWidth: 10,							// Epaisseur players
		paddleHeight: 0,		// Hauteur players
		paddleBuffer: 0,			// Ecart des players au bord

		paddle1Y: 0,	//player 1
		paddle2Y: 0,							//player 2
	
		//  ball properties
		ballRadius: 8,								// Taille de la ball
		printBall: false,							// Afficher la ball ou non
		ballX: 0,					// Placer la ball au milieu horizontal du canvas	en pourcentage
		ballY: 0,					// Placer la ball au milieu verticalement du canvas	en pourcentage

		// game properties
		scorePlayer1: 0,							// score player 1
		scorePlayer2: 0,							// score player 2
	
		scorePlayer1Elem: document.getElementById('scorePlayer1'),
		scorePlayer2Elem: document.getElementById('scorePlayer2'),
	
		countdownActive: false,					// Variable pour suivre l'état du compte à rebours
		countdownValue: 0,							// Valeur actuelle du compte à rebours
		};
		gameSettings.ballX = 0.5 * gameSettings.canvas.width;					// Placer la ball au milieu horizontal du gameSettings.canvas	en pourcentage
		gameSettings.ballY = 0.5 * gameSettings.canvas.height;
		// paddle properties
		gameSettings.paddleWidth = 10;							// Epaisseur players
		gameSettings.paddleHeight = 0.3 * gameSettings.canvas.height;		// Hauteur players
		gameSettings.paddleBuffer = 0.02 * gameSettings.canvas.width;			// Ecart des players au bord;
		gameSettings.paddle1Y = (gameSettings.canvas.height - gameSettings.paddleHeight) / 2;	//player 1
		gameSettings.paddle2Y = gameSettings.paddle1Y;							//player 2
					// Afficher la ball ou non				// Placer la ball au milieu verticalement du canvas	en pourcentage

	window.addEventListener('resize', resizeCanvas);
	resizeCanvas(gameSettings);
	websocketLock = false;
	const socket = new WebSocket('ws://localhost:8000/ws/pong/');	// new WebSocket('wss://localhost:000/ws/pong/')
	initSocket(socket, gameSettings);
	EventManager(socket, websocketLock);
}
	
	
	
	function resizeCanvas(gameSettings)								// Rendre responsive
	{
		gameSettings.canvas.width = gameSettings.canvas.clientWidth;
		gameSettings.canvas.height = gameSettings.canvas.clientHeight;
		draw(gameSettings);
	}
	
	
	async function sendMessage(data, socket, websocketLock)
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

	// ################################################################################################################ //
	// 												Connexion WebSocket													//
	// ################################################################################################################ //
	
	
function initSocket(socket, gameSettings)
{
	/// Gestion de l'ouverture de la connexion WebSocket \\\
	
socket.onopen = async function (e)
{
    console.log("WebSocket is connected ouais");
    gameSettings.printBall = true;
    console.log("printball 2", gameSettings.printBall);
    gameLoop(gameSettings);
    console.log("printball 2", gameSettings.printBall);
};
	
	
	
	
	/// Gestion de la réception de messages WebSocket \\\
	
	socket.onmessage = function (e)
	{
		const data = JSON.parse(e.data);
		if (data.type === 'pong.update')
		{
			gameSettings.paddle1Y = data.player1Y * gameSettings.canvas.height - gameSettings.paddleHeight / 2;
			gameSettings.paddle2Y = data.player2Y * gameSettings.canvas.height - gameSettings.paddleHeight / 2;
			gameSettings.ballX = data.ballX * gameSettings.canvas.width;
			gameSettings.ballY = data.ballY * gameSettings.canvas.height;
			gameSettings.scorePlayer1 = data.scorePlayer1;
			gameSettings.scorePlayer2 = data.scorePlayer2;
			gameSettings.scorePlayer1Elem.textContent = gameSettings.scorePlayer1;
			gameSettings.scorePlayer2Elem.textContent = gameSettings.scorePlayer2;
			gameSettings.printBall = data.action;
			if (gameSettings.printBall == false)
			{
				console.log('scorePlayer1:', gameSettings.scorePlayer1);
				console.log('scorePlayer2:', gameSettings.scorePlayer2);
				if (gameSettings.scorePlayer1 >= 5 || gameSettings.scorePlayer2 >= 5)
				gameOver(gameSettings.scorePlayer1, gameSettings.scorePlayer2);
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

}

// ################################################################################################################ //
// 												Connexion WebSocket													//
// ################################################################################################################ //


function EventManager(socket, websocketLock)
{

	
	//Quand une touche est pressée, on envoie un message au serveur
	document.addEventListener('keydown', e => {
		if (socket.readyState === WebSocket.OPEN && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'w' || e.key === 's')) {
			console.log(`Key pressed: ${e.key}`);
			sendMessage({
				'type': 'key.pressed',
				'key': e.key
			},socket ,websocketLock);
		}
	});
	
	//Quand une touche est relaché, on envoie un message au serveur
	document.addEventListener('keyup', e => {
		if (socket.readyState === WebSocket.OPEN && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'w' || e.key === 's')) {
			console.log(`Key released: ${e.key}`);
			sendMessage({
				'type': 'key.released',
				'key': e.key
			},socket, websocketLock);
		}
	});
	
}
	
function gameOver(scorePlayer1, scorePlayer2)
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

// Dessiner players et ball
function draw(gameSettings)
{
	ctx = gameSettings.canvas.getContext('2d');
	ctx.clearRect(0, 0, gameSettings.canvas.width, gameSettings.canvas.height);
	ctx.fillStyle = 'white';
	
	// Ligne filet
	ctx.setLineDash([15, 10]);														// Définir le motif de pointillé (10 pixels de trait, 10 pixels d'espace)
	ctx.beginPath();
	ctx.moveTo(gameSettings.canvas.width / 2, 0);
	ctx.lineTo(gameSettings.canvas.width / 2, gameSettings.canvas.height);
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.setLineDash([]);
	
	ctx.fillRect(gameSettings.canvas.width / 6, gameSettings.canvas.height / 2, gameSettings.canvas.width * 2/3, 2);		// ligne médiane de service
	
	ctx.fillRect(gameSettings.canvas.width / 6, gameSettings.canvas.height / 6, 2, gameSettings.canvas.height * 2/3);		// ligne perpendiculaire a la lgine médiane du service sur l'extremité de gauche et qui monte jusquau terrain
	ctx.fillRect(5 * gameSettings.canvas.width / 6, gameSettings.canvas.height / 6, 2, gameSettings.canvas.height * 2/3);	// ligne perpendiculaire a la lgine médiane du service sur l'extremité de droite et qui monte jusquau terrain
	ctx.fillRect(0, gameSettings.canvas.height / 6, gameSettings.canvas.width, 2);							// ligne de coté reliant les deux bouts du terrain et passant par les lignes perpendiculaires en leur extremité hautes
	ctx.fillRect(0, 5 * gameSettings.canvas.height / 6, gameSettings.canvas.width, 2);						// ligne de coté reliant les deux bouts du terrain et passant par les lignes perpendiculaires en leur extremité hautes
	
	
	// Players
	ctx.fillRect(gameSettings.paddleBuffer, gameSettings.paddle1Y, gameSettings.paddleWidth, gameSettings.paddleHeight);
	ctx.fillRect(gameSettings.canvas.width - gameSettings.paddleWidth - gameSettings.paddleBuffer, gameSettings.paddle2Y, gameSettings.paddleWidth, gameSettings.paddleHeight);
	
	// Ball
	console.log("printball before if", gameSettings.printBall);
	if (gameSettings.printBall == true)
	{
		ctx.beginPath();
		ctx.arc(gameSettings.ballX, gameSettings.ballY, gameSettings.ballRadius, 0, Math.PI * 2);
		ctx.fill();
	}
	console.log("printball after if", gameSettings.printBall);
	// Dessiner le compte à rebours si actif
	if (gameSettings.countdownActive) {
		ctx.strokeStyle = 'rgb(115, 171, 201)';										// Couleur du contour
		ctx.lineWidth = 28;															// Largeur du contour
		ctx.strokeText(gameSettings.countdownValue, gameSettings.canvas.width / 2, gameSettings.canvas.height / 2);
		ctx.font = '70px Sans-serif';
		ctx.fillStyle = 'white';
		
		// centrer en x et y
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(gameSettings.countdownValue, gameSettings.canvas.width / 2, gameSettings.canvas.height / 2);
	}
}

// Boucle du jeu
function gameLoop(gameSettings) {
    console.log("printball 3", gameSettings.printBall);
    draw(gameSettings);
    console.log("printball 4", gameSettings.printBall);
    requestAnimationFrame(() => gameLoop(gameSettings));
    console.log("printball 5", gameSettings.printBall);
}
initPong();
