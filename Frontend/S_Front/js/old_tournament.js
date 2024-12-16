function tournament_start_tournament(player_list)
{
    let	socket = new WebSocket('/ws/Tournament/');
    websocketLock = false;
    let docMain = document.querySelector('main')
    // <button class="btn btn-outline-light m-2" id="start" data-translate="true">Start the Game (lance pong.js)</button>
    docMain.innerHTML = `
	<h1 class="display-1">Matchmaking</h1>

	<div id="algo">
		<div class="container text-center">
			<div id="player-list" class="row row-cols-1 justify-content-center mt-2">

			</div>
		</div>
    </div>
	`
    tournament_initSocket(socket, websocketLock);
    console.log("hello !");
    console.log("player_list : ", player_list);

    tournoiSuisse(player_list, 3);

    // document.getElementById('start').addEventListener('click', function() {

    // 	addScript("/js/aff_pong.js", () => {
    // 		affPong(player_list[0], player_list[1]);
    // 		// envoyer les players et stocker les scores
    // 		// socket.close();		//peut etre pas le fermer car besoin des données ("on a besoin de lui pour envoyer les scores")
    // 	});
    // });
}


async function tournament_sendMessage(data, socket, websocketLock) {
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

function tournament_initSocket(socket) {
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



function getRandomPlayers(players)
{
    const shuffled = players.sort(() => 0.5 - Math.random());
    return [shuffled[0], shuffled[1]];
}

// TODO: comment est géré le tournoi à 3 ? car unread property dans pair[] si 3
function tournoiSuisse(player_list, rondes)
{
    const divElement = document.getElementById('algo');
    let joueurs = player_list;
    let scores = {};
    let matchsJoues = {};

    joueurs.forEach(joueur => {
        scores[joueur] = 0;
        matchsJoues[joueur] = [];
    });

    function playGame(joueur1, joueur2)
    {
        console.log('okk')
        return new Promise((resolve) => {
            function endGameHandler(event) {
                console.log('event message : ', event.detail.message);
                document.removeEventListener('endGame', endGameHandler);
                resolve();
            }

            document.addEventListener('endGame',  endGameHandler);

            addScript("/js/aff_pong.js", () => {
                affPong(joueur1, joueur2);
            });
        });
    }

    function readyState(joueur1, joueur2)
    {
        const startBtn = document.createElement('button');
        startBtn.className = 'btn btn-outline-light m-2';
        startBtn.textContent = 'Start Game !'; // Symbole de croix
        divElement.appendChild(startBtn);

        startBtn.addEventListener('click', async function()
        {
            await playGame(joueur1, joueur2);
        });
    }

    // Simule un match entre deux joueurs et retourne le gagnant
    // let gagnant = Math.random() < 0.5 ? joueur1 : joueur2;
    // scores[gagnant] += 1;
    // matchsJoues[joueur1].push(joueur2);
    // matchsJoues[joueur2].push(joueur1);
    // console.log(`Match : ${joueur1} vs ${joueur2} | Gagnant : ${gagnant}`);

    // Jouer les matchs de la première ronde (pour random matchmaking)	(on fait juste une cpy de la player_list)
    console.log("\n--- Ronde 1 ---");
    let pairs = [];
    let cpy_joueurs = joueurs.slice();
    while (cpy_joueurs.length > 0) {
        pairs.push(getRandomPlayers(cpy_joueurs));
        cpy_joueurs = cpy_joueurs.slice(2);
    }

    const newtext = document.createElement('div');
    newtext.className = 'h5 mt-5';
    newtext.textContent = `1ere manche :`;
    divElement.appendChild(newtext);

    pairs.forEach(pair => {
        readyState(pair[0], pair[1]);

        const first_match = document.createElement('div');
        first_match.className = 'col';
        first_match.textContent = pair[0] + " vs " + pair[1];
        divElement.appendChild(first_match);
    });
    // 	^^^ Cette partie peut etre opti en mettant une condition dans le for en dessous pour ne pas repeter le code

    for (let ronde = 2; ronde <= rondes; ronde++) {

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
        const zonedetexte = document.createElement('div');
        zonedetexte.className = 'h5 mt-5';
        zonedetexte.textContent = ronde +"eme manche :";
        divElement.appendChild(zonedetexte);

        pairs.forEach(pair => {
            readyState(pair[0], pair[1]);
            const current_game = document.createElement('div');
            current_game.className = 'col';
            current_game.textContent = pair[0] + " vs " + pair[1];
            divElement.appendChild(current_game);
        });
    }

    // Afficher les scores finaux
    console.log("\n--- Résultats finaux ---");
    let classement = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    classement.forEach(([joueur, score], index) => {
        console.log(`${index + 1}. ${joueur} - ${score} points`);
    });
}
