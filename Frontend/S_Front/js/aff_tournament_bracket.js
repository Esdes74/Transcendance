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
async function affTournamentBracket_return(player_list)
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

	const divElement = document.getElementById('algo');
	console.log("tournamentReturn player list : ", player_list);
	result = await affTournamentBracket_sendRequest({}, 'continueTournament');
	if (result.return == "endTournament")
	{
		addScript('/js/tournament_leaderboard.js', () => aff_leaderboard(result.leaderboard));
		console.log("endTournament");
		return;
	}
	console.log("NOUVEAU result : ", result);

	result.pairs.forEach(pair => {
		const current_game = document.createElement('div');
		current_game.className = 'col';
		current_game.textContent = pair[0] + " vs " + pair[1];
		divElement.appendChild(current_game);
		readyState(pair[0], pair[1], divElement);
	});
}
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
		if (result.return == "startGame")
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
