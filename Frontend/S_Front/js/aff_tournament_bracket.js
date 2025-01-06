async function affTournamentBracket_start(player_list)
{
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
	console.log("hello !");
	console.log("player_list : ", player_list);
	result = await affTournamentBracket_sendRequest({'player_list': player_list}, 'startTournament');
	// tournoiSuisse(player_list, 3);
	console.log("result : ", result);

	const divElement = document.getElementById('algo');

	result.pairs.forEach(pair => {
		const current_game = document.createElement('div');
		current_game.className = 'col';
		current_game.textContent = pair[0] + " vs " + pair[1];
		divElement.appendChild(current_game);
		readyState(pair[0], pair[1], divElement);
	});
}


function shufflePair(array)
{
	for (let i = array.length - 1; i > 0; i--)
	{
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	if (array.length >= 2)
		return [array[0], array[1]];
	else
		return [array[0]];
}

function tournoiSuisse(player_list, rounds)
{
	const divElement = document.getElementById('algo');
	let joueurs = player_list;
	let scores = {};
	let matchsJoues = {};
	let n = 0;

	joueurs.forEach(joueur => {
		scores[joueur] = 0;
		matchsJoues[joueur] = [];
	});

// Jouer les matchs de la première ronde (pour random matchmaking)	(on fait juste une cpy de la player_list)
	console.log("\n--- Ronde 1 ---");
	let pairs = [];

	while (joueurs.length > 0) {
		pairs.push(shufflePair(joueurs));
		joueurs = joueurs.slice(2);
		console.log("pairs = ", pairs);
	}
	
	const newtext = document.createElement('div');
	newtext.className = 'h5 mt-5';
	newtext.textContent = `Round ${n + 1} :`;
	divElement.appendChild(newtext);

	pairs.forEach(pair =>{
		const current_game = document.createElement('div');
		current_game.className = 'col';
		current_game.textContent = pair[0] + " vs " + pair[1];
		divElement.appendChild(current_game);
		readyState(pair[0], pair[1], divElement);
	});
}

    // pairs.forEach(pair => {
    //     readyState(pair[0], pair[1]);

    //     const first_match = document.createElement('div');
    //     first_match.className = 'col';
    //     first_match.textContent = pair[0] + " vs " + pair[1];
    //     divElement.appendChild(first_match);
    // });
    // // 	^^^ Cette partie peut etre opti en mettant une condition dans le for en dessous pour ne pas repeter le code

    // for (let ronde = 2; ronde <= rounds; ronde++) {

    //     console.log(`\n--- Ronde ${ronde} ---`);
    //     // Trier les joueurs par score
    //     let joueursTries = joueurs.slice().sort((a, b) => scores[b] - scores[a]);

    //     // Pairer les joueurs
    //     let pairs = [];
    //     let joueursRestants = joueursTries.slice();
    //     while (joueursRestants.length > 0) {
    //         let joueur1 = joueursRestants.shift();
    //         for (let i = 0; i < joueursRestants.length; i++) {
    //             let joueur2 = joueursRestants[i];
    //             if (!matchsJoues[joueur1].includes(joueur2)) {
    //                 pairs.push([joueur1, joueur2]);
    //                 joueursRestants.splice(i, 1);
    //                 break;
    //             }
    //         }
    //     }

    //     // Jouer les matchs de la ronde
    //     const zonedetexte = document.createElement('div');
    //     zonedetexte.className = 'h5 mt-5';
    //     zonedetexte.textContent = ronde +"eme manche :";
    //     divElement.appendChild(zonedetexte);

    //     pairs.forEach(pair => {
    //         readyState(pair[0], pair[1]);
    //         const current_game = document.createElement('div');
    //         current_game.className = 'col';
    //         current_game.textContent = pair[0] + " vs " + pair[1];
    //         divElement.appendChild(current_game);
    //     });
    // }

    // // Afficher les scores finaux
    // console.log("\n--- Résultats finaux ---");
    // let classement = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    // classement.forEach(([joueur, score], index) => {
    //     console.log(`${index + 1}. ${joueur} - ${score} points`);
    // });
// }



function readyState(joueur1, joueur2, divElement)
{
	const startBtn = document.createElement('button');
	startBtn.className = 'btn btn-outline-light m-2';
	startBtn.textContent = 'Start Game !'; // Symbole de croix
	divElement.appendChild(startBtn);

	startBtn.addEventListener('click', async function()
	{
		result = await affTournamentBracket_sendRequest({
			'joueur1': joueur1,
			'joueur2': joueur2
		}, 'startGame');
		if (result == "startGame")
		{
			addScript('/js/aff_pong.js', () => affPong(joueur1, joueur2));
		}
	});
}

// Fonction qui envoie les requêtes à l'API
async function affTournamentBracket_sendRequest(data, function_name)
{
	console.log('Envoi de la requête à l\'API :', data, "et la funciton name : ", function_name);
	const response = await fetch('/api/tournament/'+ function_name + '/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		credentials: 'include'
	});

	const result = await response.json();
	console.log('Réponse de l\'API :', result);
	return result;
}