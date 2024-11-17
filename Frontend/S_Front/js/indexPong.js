function initIndexPong()
{
	
	const gameSettings = {
		canvas: document.getElementById('pongCanvas'),
		// paddle properties
		paddleWidth: 10,							// Epaisseur players
		paddleHeight: 0,		// Hauteur players
		paddleBuffer: 0,			// Ecart des players au bord

		paddle1Y: 0,	//player 1
		paddle2Y: 0,							//player 2
		player1: 0.5,
		player2: 0.5,
	
		//  ball properties
		ballRadius: 8,								// Taille de la ball
		printBall: false,							// Afficher la ball ou non
		ballX: 0,					// Placer la ball au milieu horizontal du canvas	en pourcentage
		ballY: 0,					// Placer la ball au milieu verticalement du canvas	en pourcentage

		ballSpeedX: 0.008,
		ballSpeedY: 0.008,
		maxSpeed: 0.012,
		acceleration: 1.1,

		ArrowUp: false,
		ArrowDown: false,
		w: false,
		s: false,

		// game properties
		scorePlayer1: 0,							// score player 1
		scorePlayer2: 0,							// score player 2
	
		scorePlayer1Elem: document.getElementById('scorePlayer1'),
		scorePlayer2Elem: document.getElementById('scorePlayer2'),
	
		countdownActive: false,					// Variable pour suivre l'état du compte à rebours
		countdownValue: 0,							// Valeur actuelle du compte à rebours
	};
		resizeIndexCanvas(gameSettings);
		gameSettings.ballX = 0.5 * gameSettings.canvas.width;					// Placer la ball au milieu horizontal du gameSettings.canvas	en pourcentage
		gameSettings.ballY = 0.5 * gameSettings.canvas.height;
		console.log(gameSettings.ballX)
		console.log(gameSettings.ballY)
		// paddle properties
		gameSettings.paddleWidth = 10;							// Epaisseur players
		gameSettings.paddleHeight = 0.3 * gameSettings.canvas.height;		// Hauteur players
		gameSettings.paddleBuffer = 0.02 * gameSettings.canvas.width;			// Ecart des players au bord;
		gameSettings.paddle1Y = (gameSettings.canvas.height - gameSettings.paddleHeight) / 2;	//player 1
		gameSettings.paddle2Y = gameSettings.paddle1Y;							//player 2
					// Afficher la ball ou non				// Placer la ball au milieu verticalement du canvas	en pourcentage

	indexEventManager(gameSettings);
//	window.addEventListener('resize', resizeIndexCanvas);
	gameSettings.printBall = true;
	indexGameLoop(gameSettings);
}
	
	
	
function resizeIndexCanvas(gameSettings)								// Rendre responsive
{
	gameSettings.canvas.width = gameSettings.canvas.clientWidth;
	gameSettings.canvas.height = gameSettings.canvas.clientHeight;
	indexDraw(gameSettings);
}
	
function indexEventManager(gameSettings)
{

	
	//Quand une touche est pressée, on envoie un message au serveur
	document.addEventListener('keydown', e => {
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'w' || e.key === 's')
		{
 			if (e.key === 'ArrowUp')
				gameSettings.ArrowUp = true
			else if (e.key === 'ArrowDown')
			 	gameSettings.ArrowDown = true
			else if (e.key === 'w')
				gameSettings.w = true
			else
				gameSettings.s = true
		}
	});
	
	//Quand une touche est relaché, on envoie un message au serveur
	document.addEventListener('keyup', e => {
		if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'w' || e.key === 's')
		{
 			if (e.key === 'ArrowUp')
				gameSettings.ArrowUp = false
			else if (e.key === 'ArrowDown')
			 	gameSettings.ArrowDown = false
			else if (e.key === 'w')
				gameSettings.w = false
			else
				gameSettings.s = false
		}
	});
	
}

// Dessiner players et ball
function indexDraw(gameSettings)
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
//	if (gameSettings.printBall == true)
//	{
		ctx.beginPath();
		ctx.arc(gameSettings.ballX, gameSettings.ballY, gameSettings.ballRadius, 0, Math.PI * 2);
		ctx.fill();
//	}
	// Dessiner le compte à rebours si actif
}

// Boucle du jeu
function indexGameLoop(gameSettings) {
    indexDraw(gameSettings);
    gameSettings.ballX += gameSettings.ballSpeedX * gameSettings.canvas.width;
    gameSettings.ballY += gameSettings.ballSpeedY * gameSettings.canvas.height;
    gameSettings.ballSpeedX 
    if (gameSettings.w)
    {
	gameSettings.player1 = gameSettings.player1 - 0.012
	gameSettings.paddle1Y = gameSettings.player1 * gameSettings.canvas.height - gameSettings.paddleHeight / 2
    }
    if (gameSettings.s)
    {
	gameSettings.player1 = gameSettings.player1 + 0.012
	gameSettings.paddle1Y = gameSettings.player1 * gameSettings.canvas.height - gameSettings.paddleHeight / 2
    }
    if (gameSettings.ArrowUp)
    {
	gameSettings.player2 = gameSettings.player2 - 0.012
	gameSettings.paddle2Y = gameSettings.player2 * gameSettings.canvas.height - gameSettings.paddleHeight / 2
    }
    if (gameSettings.ArrowDown)
    {
	gameSettings.player2 = gameSettings.player2 + 0.012
	gameSettings.paddle2Y = gameSettings.player2 * gameSettings.canvas.height - gameSettings.paddleHeight / 2
    }
    if (gameSettings.ballX <= 0.05 * gameSettings.canvas.width)
    {
        gameSettings.ballSpeedX *= -1
        gameSettings.ballSpeedY = (gameSettings.ballY - gameSettings.paddle1Y) / gameSettings.canvas.height * 0.03            //   # Rebond en fonction de la position de la raquette
    }
    if (gameSettings.ballX >= 0.95 * gameSettings.canvas.width)
    {
	gameSettings.ballSpeedX *= -1
        gameSettingsballSpeedY = (gameSettings.ballY - gameSettings.paddle2Y) / gameSettings.canvas.height * 0.03
    }
    if (gameSettings.ballY <= 8 || gameSettings.ballY >= gameSettings.canvas.height - 8)
    {
	gameSettings.ballSpeedY *= -1
    }
  
    requestAnimationFrame(() => indexGameLoop(gameSettings));
}
initIndexPong();
