function start_tournament(player_list)
{
	let	socket = new WebSocket('/ws/Tournament/');
	websocketLock = false;
	
	
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<h1>Matchmaking</h1>
	`
	initSocket(socket, websocketLock); // Ne pas appeler la fonction comme ca (probleme de fonctions avec meme noms)
	console.log("hello !");
	console.log("player_list : ", player_list);
}

// function start_tournament(player_list) {
// }


async function sendMessage(data, socket, websocketLock) {
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

function initSocket(socket) {
	// Handle the WebSocket events
	socket.onopen = function (e) {
		console.log("WebSocket is open now.");
	};
	
	socket.onmessage = function (e) {
		const data = JSON.parse(e.data);
		console.log("Message received from server:", data);
		// Handle incoming messages from the server
	};
	
	socket.onerror = function (e) {
		console.error('WebSocket error observed:', e);
	};
	
	socket.onclose = function (e) {
		console.log('WebSocket is closed now.', e);
	};
}




















/*



function tournoiSuisse(n, rondes) {
	// Initialisation des joueurs et scores
	let joueurs = Array.from({ length: n }, (_, i) => `Joueur ${i + 1}`);
	let scores = {};
	let matchsJoues = {};

	joueurs.forEach(joueur => {
		scores[joueur] = 0;
		matchsJoues[joueur] = [];
	});

	function jouerMatch(joueur1, joueur2) {
		// Simule un match entre deux joueurs et retourne le gagnant
		let gagnant = Math.random() < 0.5 ? joueur1 : joueur2;
		scores[gagnant] += 1;
		matchsJoues[joueur1].push(joueur2);
		matchsJoues[joueur2].push(joueur1);
		console.log(`Match : ${joueur1} vs ${joueur2} | Gagnant : ${gagnant}`);
	}

	for (let ronde = 1; ronde <= rondes; ronde++) {
		console.log(`\n--- Ronde ${ronde} ---`);
		// Trier les joueurs par score
		let joueursTries = joueurs.slice().sort((a, b) => scores[b] - scores[a]);

		// Pairer les joueurs
		let pairs = [];
		let joueursRestants = joueursTries.slice();
		while (joueursRestants.length > 0) {
			let joueur1 = joueursRestants.shift();
			for (let i = 0; i < joueursRestants.length; i++) {
				let joueur2 = joueursRestants[i];
				if (!matchsJoues[joueur1].includes(joueur2)) {
					pairs.push([joueur1, joueur2]);
					joueursRestants.splice(i, 1);
					break;
				}
			}
		}

		// Jouer les matchs de la ronde
		pairs.forEach(pair => {
			jouerMatch(pair[0], pair[1]);
		});
	}

	// Afficher les scores finaux
	console.log("\n--- Résultats finaux ---");
	let classement = Object.entries(scores).sort((a, b) => b[1] - a[1]);
	classement.forEach(([joueur, score], index) => {
		console.log(`${index + 1}. ${joueur} - ${score} points`);
	});
}

// Appel de la fonction avec des paramètres d'exemple
tournoiSuisse(8, 3);


*/
