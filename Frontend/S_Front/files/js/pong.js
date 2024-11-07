const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

const playerWidth = 10;			// Epaisseur players
const playerHeight = 0.30 * canvas.height;			// Hauteur players
const ballRadius = 8;				// Taille de la ball
let printBall = false;			// Afficher la ball ou non

let player1X = 0.05
let player2X = 1 - player1X
let player1Y = (canvas.height - playerHeight) / 2;	//player 1
let player2Y = player1Y;							//player 2

let scorePlayer1 = 0;				// score player 1
let scorePlayer2 = 0;				// score player 2

const scorePlayer1Elem = document.getElementById('scorePlayer1');
const scorePlayer2Elem = document.getElementById('scorePlayer2');

let ballX = 0.5 * canvas.width;		// Placer la ball au milieu horizontal du canvas	en pourcentage
let ballY = 0.5 * canvas.height;	// Placer la ball au milieu verticalement du canvas	en pourcentage

let ballSpeed = 0.01;				// Vitesse de la ball par défaut
let ballSpeedX = 0.01;				// Vitesse de la ball X
let ballSpeedY = 0.01;				// Vitesse de la ball Y
// const MAX_SPEED = 16;				// Vitesse max de la ball
// const acceleration = 1.1;			// Vitesse multiplie a chaque renvoi

const playerBuffer = 0.05 * canvas.width;			// Ecart des players au bord

canvas.width = canvas.clientWidth; // Rendre responsive
const countdownElem = document.getElementById('countdown');

let websocketLock = false;

// ################################################################################################################ //
// 												Connexion WebSocket													//
// ################################################################################################################ //

const socket = new WebSocket('ws://localhost:8000/ws/pong/');

// Gestion de l'ouverture de la connexion WebSocket
socket.onopen = async function (e) {
	console.log("WebSocket is connected ouais");
	// Afficher le compte à rebours avant que ça commence
	// draw();
	gameLoop();
	startCountdown(2);
};

// Fonction pour démarrer le compte à rebours
function startCountdown(seconds) {
    let counter = seconds;

    const interval = setInterval(() => {
		countdownElem.textContent = counter;

		console.log('counter:', counter);
        counter--;
        if (counter < 0) {
            clearInterval(interval);
            countdownElem.style.display = 'none';
			printBall = true;
			console.log('GO !');
        }
    }, 1000);
}

// function startGame() {
//     // Code pour démarrer le jeu
//     console.log("Game started!");
// }

async function sendMessage(data) {
    if (websocketLock) {
        return; // Si le verrou est actif, ne pas envoyer de message
    }
    websocketLock = true; // Activer le verrou

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(data));
    }

    websocketLock = false; // Désactiver le verrou
}

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
		printBall = data.action
		if (printBall == false) {
			console.log('scorePlayer1:', scorePlayer1);
			console.log('scorePlayer2:', scorePlayer2);
			if (scorePlayer1 >= 5 || scorePlayer2 >= 5) {
				gameOver();
			}
			else {
				setTimeout(() => {
					printBall = true;
				}, 1000);
			}
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

socket.addEventListener('open', () => {
	setInterval(() => {
	if (socket.readyState === WebSocket.OPEN && printBall == true) {
        sendMessage({
			'type': 'pong.ball',
		});
	}
}, 10);
});

function gameOver()
{
	const winMessageElem = document.getElementById('winMessage');
	if (scorePlayer1 > scorePlayer2) {
		winMessageElem.textContent = 'Player 1 wins!';
	}
	else {
		winMessageElem.textContent = 'Player 2 wins!';
	}
	winMessageElem.style.display = 'block';  // Rendre visible l'encadré

	const replayBlockElem = document.getElementById('replayBlock');
	replayBlockElem.style.display = 'block';

	document.getElementById('YES').addEventListener('click', function() {
		location.reload(); // Recharger la page pour rejouer
	});
	
	document.getElementById('SETTING').addEventListener('click', function() {
		window.location.href = 'settings.html'; // Rediriger vers la page des paramètres
	});
	
	document.getElementById('BTH').addEventListener('click', function() {
		window.location.href = 'index.html'; // Rediriger vers la page d'accueil
	});
	// TODO save les statistiques dans le profil des joueurs
}


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

// Boucle du jeu
function gameLoop() {
	draw();
	requestAnimationFrame(gameLoop);
}

// gameLoop();
