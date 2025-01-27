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
	myPath = "wss://" + location.host
	if (myCanvas.id === "AICanvasHard")
		socket = new WebSocket(myPath + "/ws/pong/ai/hard");
	else if (myCanvas.id === "AICanvasEasy")
		socket = new WebSocket(myPath + "/ws/pong/ai/easy");
	else
		socket = new WebSocket(myPath +"/ws/pong/");
	pong_initSocket(socket, pong_gameSettings);
	pong_EventManager(socket, myCanvas.id,  pong_gameSettings);
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
			if (pong_gameSettings.printBall === false) {
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
		else if (data.type === 'error')
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
	};

}

// ################################################################################################################ //
// 												Connexion WebSocket													//
// ################################################################################################################ //
function pong_keyPressed(e, socket, message, canvasID) {
	if (socket.readyState === WebSocket.OPEN && ((canvasID === "pongCanvas" && (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'w' || e.key === 's' || e.key === 'W' || e.key === 'S'))
		|| (canvasID !== "pongCanvas" && (e.key === 'w' || e.key === 's' || e.key === 'W' || e.key === 'S'))))
	{
		e.preventDefault()
		pong_sendMessage({'type': message, 'key': e.key}, socket);
	}
}

function pong_EventManager(socket, canvasID, pong_gameSettings) {

	document.addEventListener('keydown', e => pong_keyPressed(e, socket, 'key.pressed', canvasID));
	document.addEventListener('keyup', e => pong_keyPressed(e, socket, 'key.released', canvasID));
	pong_addTouchControls(pong_gameSettings, socket, canvasID);

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

	if (currentPath !== '/pong') {
		window.removeEventListener('resize', pong_resizeCanvas);
		window.removeEventListener('pageChanged', pong_handleViewChange);
		window.removeEventListener('popstate', pong_handleViewChange);
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
	if (pong_gameSettings.canvas.id !== "pongCanvas")
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
		winMessageElem.style.display = 'block';

		const replayBlockElem = document.getElementsByClassName("replayBlock")[0];
		replayBlockElem.style.display = 'block';

		const buttons = replayBlockElem.getElementsByClassName("btn");
		for (let i = 0; i < buttons.length; i++) {
			if (buttons[i].id !== "nextButton") {
				buttons[i].style.display = 'none';
			}
		}
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
	if (pong_gameSettings.printBall === true) {
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
function pong_gameLoop(pong_gameSettings, socket)
{
	pong_draw(pong_gameSettings);
	if (socket.readyState === WebSocket.OPEN)
		requestAnimationFrame(() => pong_gameLoop(pong_gameSettings, socket));
}

function throttle(func, limit)
{
	let lastFunc;
	let lastRan;
	return function(...args) {
		const context = this;
		if (!lastRan) {
			func.apply(context, args);
			lastRan = Date.now();
		} else {
			clearTimeout(lastFunc);
			lastFunc = setTimeout(function() {
				if ((Date.now() - lastRan) >= limit) {
					func.apply(context, args);
					lastRan = Date.now();
				}
			}, limit - (Date.now() - lastRan));
		}
	};
}

function pong_addTouchControls(pong_gameSettings, socket)
{
	if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
		const canvas = pong_gameSettings.canvas;

		const activeKeys = { player1: null, player2: null };
		const touchZones = {};
		const deadZoneMargin = 3;

		pong_gameSettings.touchHandlers = {
			onTouchStart: function (event) {
				handleTouchStart(event, canvas, touchZones);
			},
			onTouchMove: function (event) {
				handleTouchMove(event, pong_gameSettings, socket, canvas, touchZones, deadZoneMargin, activeKeys);
			},
			onTouchEnd: function (event) {
				handleTouchEnd(event, socket, touchZones, activeKeys);
			}
		};


		canvas.addEventListener('touchstart', pong_gameSettings.touchHandlers.onTouchStart);
		canvas.addEventListener('touchmove', throttle(pong_gameSettings.touchHandlers.onTouchMove, 4));
		canvas.addEventListener('touchend', pong_gameSettings.touchHandlers.onTouchEnd);
		canvas.addEventListener('touchcancel', pong_gameSettings.touchHandlers.onTouchEnd);
	}
}

function handleTouchStart(event, canvas, touchZones)
{
		event.preventDefault();
		const canvasRect = canvas.getBoundingClientRect();

		for (const touch of event.changedTouches) {
			const touchX = touch.clientX - canvasRect.left;

			if (touchX < canvasRect.width / 2) {
				touchZones[touch.identifier] = 'player1';
			} else {
				touchZones[touch.identifier] = 'player2';
			}
		}
}

function handleTouchMove(event, pong_gameSettings, socket, canvas, touchZones, deadZoneMargin, activeKeys)
{
	event.preventDefault();
	const canvasRect = canvas.getBoundingClientRect();

	for (const touch of event.touches) {
		//const touchX = touch.clientX - canvasRect.left;
		const touchY = touch.clientY - canvasRect.top;
		const zone = touchZones[touch.identifier];

		if (!zone) continue;

		if (zone === 'player1') {
			if (touchY < pong_gameSettings.paddle1Y - deadZoneMargin) {
				updateKeyState('player1', 'w', socket, activeKeys);
			} else if (touchY > pong_gameSettings.paddle1Y + pong_gameSettings.paddleHeight + deadZoneMargin) {
				updateKeyState('player1', 's', socket, activeKeys);
			} else {
				updateKeyState('player1', null, socket, activeKeys);
			}
		} else if (zone === 'player2') {
			if (touchY < pong_gameSettings.paddle2Y - deadZoneMargin) {
				updateKeyState('player2', 'ArrowUp', socket, activeKeys);
			} else if (touchY > pong_gameSettings.paddle2Y + pong_gameSettings.paddleHeight + deadZoneMargin) {
				updateKeyState('player2', 'ArrowDown', socket, activeKeys);
			} else {
				updateKeyState('player2', null, socket, activeKeys);
			}
		}
	}
}

function handleTouchEnd(event, socket, touchZones, activeKeys)
{
	event.preventDefault();

	for (const touch of event.changedTouches) {
		const zone = touchZones[touch.identifier];
		if (!zone) continue;

		updateKeyState(zone, null, socket, activeKeys);
		delete touchZones[touch.identifier];
	}
}

function updateKeyState(player, newKey, socket, activeKeys)
{
	const currentKey = activeKeys[player];

	if (currentKey !== newKey) {
		if (currentKey && socket.readyState === WebSocket.OPEN)
		{
			pong_sendMessage({
				type: 'key.released',
				key: currentKey
			}, socket);
		}
		if (newKey && socket.readyState === WebSocket.OPEN) {
			pong_sendMessage({
				type: 'key.pressed',
				key: newKey
			}, socket);
		}

		activeKeys[player] = newKey;
	}
}
