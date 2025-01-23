function initPong(boolean, myCanvas, uuid) {

	const pong_gameSettings = {
		canvas: myCanvas,
		// paddle properties
		paddleWidth: 0,							// Epaisseur players
		paddleHeight: 0,		// Hauteur players
		paddleBuffer: 0,			// Ecart des players au bord

		paddle1Y: 0,	//player 1
		paddle2Y: 0,							//player 2

		//  ball properties
		ballRadius: 0,								// Taille de la ball
		printBall: false,							// Afficher la ball ou non
		ballX: 0,					// Placer la ball au milieu horizontal du canvas	en pourcentage
		ballY: 0,					// Placer la ball au milieu verticalement du canvas	en pourcentage

		// game properties
		scorePlayer1: 0,							// score player 1
		scorePlayer2: 0,							// score player 2

		// recup names
		player1Name: document.getElementById('Player1').textContent,
		player2Name: document.getElementById('Player2').textContent,
		istournament: boolean,

		scorePlayer1Elem: document.getElementById('scorePlayer1'),
		scorePlayer2Elem: document.getElementById('scorePlayer2'),// Valeur actuelle du compte à rebours

		uuid : uuid
	};

	pong_initCanvas(pong_gameSettings)

	window.addEventListener('resize', function() {
		pong_resizeCanvas(pong_gameSettings);
	});
	let socket;
	if (myCanvas.id === "AICanvas")
		socket = new WebSocket("/ws/pong/ai/");		//		wss://localhost:000/ws/pong/ai/
	else
		socket = new WebSocket("/ws/pong/");		//		wss://localhost:3000/ws/pong/
	pong_initSocket(socket, pong_gameSettings);
	pong_EventManager(socket, myCanvas.id);
}

function pong_initCanvas(pong_gameSettings)
{
	pong_gameSettings.canvas.width = pong_gameSettings.canvas.clientWidth;
	pong_gameSettings.canvas.height = pong_gameSettings.canvas.clientHeight;
	pong_gameSettings.paddleWidth = 0.015 * pong_gameSettings.canvas.width;							// Epaisseur players
	pong_gameSettings.ballRadius = 0.012 * pong_gameSettings.canvas.width;				// Taille de la ball
	pong_gameSettings.ballX = 0.5 * pong_gameSettings.canvas.width;					// Placer la ball au milieu horizontal du pong_gameSettings.canvas	en pourcentage
	pong_gameSettings.ballY = 0.5 * pong_gameSettings.canvas.height;
	pong_gameSettings.paddleHeight = 0.25 * pong_gameSettings.canvas.height;		// Hauteur players
	pong_gameSettings.paddleBuffer = 0.02 * pong_gameSettings.canvas.width;			// Ecart des players au bord;
	pong_gameSettings.paddle1Y = (pong_gameSettings.canvas.height - pong_gameSettings.paddleHeight) / 2;	//player 1
	pong_gameSettings.paddle2Y = pong_gameSettings.paddle1Y;
	pong_draw(pong_gameSettings);
}

function pong_resizeCanvas(pong_gameSettings)								// Rendre responsive
{
	pong_gameSettings.canvas.width = pong_gameSettings.canvas.clientWidth;
	pong_gameSettings.canvas.height = pong_gameSettings.canvas.clientHeight;
	pong_gameSettings.paddleWidth = 0.015 * pong_gameSettings.canvas.width;							// Epaisseur players
	pong_gameSettings.ballRadius = 0.012 * pong_gameSettings.canvas.width;				// Taille de la ball
	pong_gameSettings.paddleHeight = 0.25 * pong_gameSettings.canvas.height;		// Hauteur players
	pong_gameSettings.paddleBuffer = 0.02 * pong_gameSettings.canvas.width;			// Ecart des players au bord;
	pong_draw(pong_gameSettings);
}



async function pong_sendMessage(data, socket) {
	if (socket.readyState === WebSocket.OPEN)
	{
		socket.send(JSON.stringify(data));
	}
	else
	{
		updatePage("50X");
	//	console.error('WebSocket is not open:', socket.readyState);
	}
}

// ################################################################################################################ //
// 												Connexion WebSocket													//
// ################################################################################################################ //


function pong_initSocket(socket, pong_gameSettings) {
	/// Gestion de l'ouverture de la connexion WebSocket \\\

	socket.onopen = async function (e) {
		console.log("WebSocket is connected ouais");
		// startCountdown(3, pong_gameSettings);
		pong_gameLoop(pong_gameSettings, socket);
	};




	/// Gestion de la réception de messages WebSocket \\\

	socket.onmessage = function (e) {
		const data = JSON.parse(e.data);
		if (data.type === 'pong.update') {
			pong_gameSettings.paddle1Y = data.player1Y * pong_gameSettings.canvas.height - pong_gameSettings.paddleHeight / 2;
			pong_gameSettings.paddle2Y = data.player2Y * pong_gameSettings.canvas.height - pong_gameSettings.paddleHeight / 2;
			pong_gameSettings.ballX = data.ballX * pong_gameSettings.canvas.width;
			pong_gameSettings.ballY = data.ballY * pong_gameSettings.canvas.height;
			pong_gameSettings.scorePlayer1 = data.scorePlayer1;
			pong_gameSettings.scorePlayer2 = data.scorePlayer2;
			pong_gameSettings.scorePlayer1Elem.textContent = pong_gameSettings.scorePlayer1;
			pong_gameSettings.scorePlayer2Elem.textContent = pong_gameSettings.scorePlayer2;
			pong_gameSettings.printBall = data.action;
			if (pong_gameSettings.printBall == false) {
				console.log('scorePlayer1:', pong_gameSettings.scorePlayer1);
				console.log('scorePlayer2:', pong_gameSettings.scorePlayer2);
				if ((pong_gameSettings.scorePlayer1 >= 5 || pong_gameSettings.scorePlayer2 >= 5))
					pong_gameOver(pong_gameSettings, socket);
			}
		}
		else if (data.type === 'pong.countdown')
		{
			pong_gameSettings.countdownValue = data.value;
			pong_gameSettings.countdownActive = true;
			pong_draw(pong_gameSettings);
			if (pong_gameSettings.countdownValue <= 0)
				pong_gameSettings.countdownActive = false;
		}
		else if (data.type==='error')
		{
			socket.close();
			updatePage("50X");
		}
	};

	// Gestion des erreurs WebSocket
	socket.onerror = function (error) {
		updatePage("50X");
		//console.error('WebSocket error la big erreur la:', error);
	};

	// Gestion de la fermeture de la connexion WebSocket
	socket.onclose = function (e) {
		document.removeEventListener('keydown', e);
		document.removeEventListener('keyup', e);
		socket.close();
		console.log('WebSocket is closed bah il sest ferme:', e);
	};

}

// ################################################################################################################ //
// 												Connexion WebSocket													//
// ################################################################################################################ //
function pong_keyPressed(e, socket, message, canvasID) {
	if (socket.readyState === WebSocket.OPEN && ((canvasID === "pongCanvas" && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'w' || e.key === 's' || e.key === 'W' || e.key === 'S'))
		|| (canvasID === "AICanvas" && (e.key === 'w' || e.key === 's' || e.key === 'W' || e.key === 'S'))))
	{
		e.preventDefault()
		pong_sendMessage({'type': message, 'key': e.key}, socket);
	}
}

function pong_EventManager(socket, canvasID) {
	console.log('pong_EventManager initialized');

	document.addEventListener('keydown', e => pong_keyPressed(e, socket, 'key.pressed', canvasID));
	document.addEventListener('keyup', e => pong_keyPressed(e, socket, 'key.released', canvasID));

	function pong_handleViewChangeWrapper(event) {
		pong_handleViewChange(socket);
		document.removeEventListener(event.type, pong_handleViewChangeWrapper);
	}

	document.addEventListener('pageChanged', pong_handleViewChangeWrapper);
	document.addEventListener('popstate', pong_handleViewChangeWrapper);
	window.addEventListener('popstate', () => {
		socket.close();
	})
}

function pong_handleViewChange(socket) {
	currentPath = window.location.pathname;

	//console.log(currentPath);
	if (currentPath !== '/pong') {
		window.removeEventListener('resize', pong_resizeCanvas);
		window.removeEventListener('pageChanged', pong_handleViewChange);
		window.removeEventListener('popstate', pong_handleViewChange);
		console.log("socket closed")
		socket.close();
		socket = null;
	}
}


function pong_gameOver(pong_gameSettings, socket)
{
	socket.close();
	const winMessageElem = document.getElementById('winMessage');
	const winMsg = document.getElementById('WinMsg');
	if (pong_gameSettings.scorePlayer1 > pong_gameSettings.scorePlayer2) {
		winMessageElem.textContent = pong_gameSettings.player1Name;
	}
	else {
		winMessageElem.textContent = pong_gameSettings.player2Name;
	}
	if (pong_gameSettings.canvas.id === "AICanvas")
	{
		winMessageElem.style.display = 'block'
		winMsg.style.display = 'block';
		const replayBlockElem = document.getElementsByClassName("replayBlock")[0];
		replayBlockElem.style.display = 'block';	
	}	
	else if (!pong_gameSettings.istournament)
	{
		winMessageElem.style.display = 'block';  // Rendre visible l'encadré
		winMsg.style.display = 'block';
		
		const replayBlockElem = document.getElementsByClassName("replayBlock")[0];
		replayBlockElem.style.display = 'block';
		
		// Afficher les boutons "Rejouer", "Paramètres", "Retour à l'accueil"
		const buttons = replayBlockElem.getElementsByClassName("btn");
		for (let i = 0; i < buttons.length; i++)
		{
			
			buttons[i].style.display = 'inline-block';
			buttons[i].addEventListener('click', async () => {
				redirectTo(buttons[i].value, socket, pong_gameSettings);
			});
		}
		
		// Masquer le bouton "Suivant"
		if (document.getElementById("nextButton"))
		document.getElementById("nextButton").style.display = 'none';
	}
	else if (pong_gameSettings.istournament)
	{
		console.log('TOURNOI car ', pong_gameSettings.istournament);
		winMessageElem.style.display = 'block';  // Rendre visible l'encadré

		const replayBlockElem = document.getElementsByClassName("replayBlock")[0];
		replayBlockElem.style.display = 'block';

		// Masquer les boutons "Rejouer", "Paramètres", "Retour à l'accueil"
		const buttons = replayBlockElem.getElementsByClassName("btn");
		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].id !== "nextButton") {
				buttons[i].style.display = 'none';
			}
		}
		console.log('bouton next. socket.readyState = ', socket.readyState);
		console.log('bouton next. WebSocket.OPEN = ', WebSocket.OPEN);
		nextBtn = document.getElementById('nextButton');
		nextBtn.addEventListener('click', async () => {
			redirectTo(nextBtn.value, socket, pong_gameSettings);
		});
	}
	tradNewPage();
}


async function redirectTo(path, socket, pong_gameSettings)
{
	let fct;
	if (path === 'pong')
		fct = () => affPong();
	if (path === 'index')
	{
		updatePage("");
		return;
	}
	if (path === 'tournament_bracket')
	{
		let winner = pong_gameSettings.player1Name;
		if (pong_gameSettings.scorePlayer1 < pong_gameSettings.scorePlayer2)
			winner = pong_gameSettings.player2Name;
		result = await affTournamentBracket_sendRequest({
			'player1': pong_gameSettings.player1Name,
			'player2':  pong_gameSettings.player2Name,
			'winner': winner,
			'uuid': pong_gameSettings.uuid
		}, 'endGame');
		fct = () => affTournamentBracket_start(null, pong_gameSettings.uuid);
	}
	// if (path === 'ai')
	// 	fct = () => affAI();
	addScript("/js/aff_" + path + ".js", fct);
	socket.close();
}


function pong_draw(pong_gameSettings) {
	let ctx = pong_gameSettings.canvas.getContext('2d');
	// console.log('gamesettings width =', pong_gameSettings.canvas.width);
	// console.log('gamesettings CLIENT =', pong_gameSettings.canvas.clientWidth);
	// let ctx = document.getElementById(pong_gameSettings.canvas.id).getContext('2d');
	ctx.clearRect(0, 0, pong_gameSettings.canvas.width, pong_gameSettings.canvas.height);
	ctx.fillStyle = 'white';

	// Ligne filet
	ctx.setLineDash([1.5 * pong_gameSettings.paddleWidth, pong_gameSettings.paddleWidth]);														// Définir le motif de pointillé (10 pixels de trait, 10 pixels d'espace)
	ctx.beginPath();
	ctx.moveTo(pong_gameSettings.canvas.width / 2, 0);
	ctx.lineTo(pong_gameSettings.canvas.width / 2, pong_gameSettings.canvas.height);
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 0.3 * pong_gameSettings.paddleWidth;
	ctx.stroke();
	ctx.setLineDash([]);

	ctx.fillRect(pong_gameSettings.canvas.width / 6, pong_gameSettings.canvas.height / 2, pong_gameSettings.canvas.width * 2 / 3, 2);		// ligne médiane de service

	ctx.fillRect(pong_gameSettings.canvas.width / 6, pong_gameSettings.canvas.height / 6, 2, pong_gameSettings.canvas.height * 2 / 3);		// ligne perpendiculaire a la lgine médiane du service sur l'extremité de gauche et qui monte jusquau terrain
	ctx.fillRect(5 * pong_gameSettings.canvas.width / 6, pong_gameSettings.canvas.height / 6, 2, pong_gameSettings.canvas.height * 2 / 3);	// ligne perpendiculaire a la lgine médiane du service sur l'extremité de droite et qui monte jusquau terrain
	ctx.fillRect(0, pong_gameSettings.canvas.height / 6, pong_gameSettings.canvas.width, 2);							// ligne de coté reliant les deux bouts du terrain et passant par les lignes perpendiculaires en leur extremité hautes
	ctx.fillRect(0, 5 * pong_gameSettings.canvas.height / 6, pong_gameSettings.canvas.width, 2);						// ligne de coté reliant les deux bouts du terrain et passant par les lignes perpendiculaires en leur extremité hautes


	// Players
	ctx.fillRect(pong_gameSettings.paddleBuffer, pong_gameSettings.paddle1Y, pong_gameSettings.paddleWidth, pong_gameSettings.paddleHeight);
	ctx.fillRect(pong_gameSettings.canvas.width - pong_gameSettings.paddleWidth - pong_gameSettings.paddleBuffer, pong_gameSettings.paddle2Y, pong_gameSettings.paddleWidth, pong_gameSettings.paddleHeight);

	// Ball
	if (pong_gameSettings.printBall == true) {
		ctx.beginPath();
		ctx.arc(pong_gameSettings.ballX, pong_gameSettings.ballY, pong_gameSettings.ballRadius, 0, Math.PI * 2);
		ctx.fill();
	}
	// Dessiner le compte à rebours si actif
	if (pong_gameSettings.countdownActive) {
		ctx.strokeStyle = 'rgb(115, 171, 201)';										// Couleur du contour
		ctx.lineWidth = 0.03 * pong_gameSettings.canvas.width;															// Largeur du contour
		ctx.strokeText(pong_gameSettings.countdownValue, pong_gameSettings.canvas.width / 2, pong_gameSettings.canvas.height / 2);
		ctx.font = `${0.1 * pong_gameSettings.canvas.width}px Sans-serif`;
		ctx.fillStyle = 'white';

		// center  x and y
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillText(pong_gameSettings.countdownValue, pong_gameSettings.canvas.width / 2, pong_gameSettings.canvas.height / 2);
	}
}

// Boucle du jeu
function pong_gameLoop(pong_gameSettings, socket) {
	pong_draw(pong_gameSettings);
	if (socket.readyState === WebSocket.OPEN)
		requestAnimationFrame(() => pong_gameLoop(pong_gameSettings, socket));
}
