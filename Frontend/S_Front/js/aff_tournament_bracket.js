function callbackTournamentBraquet(result)
{
	aff_leaderboard(result)
}

function paringPrintLoop(pair, uuid)
{
	const algoDiv = document.getElementById('algo');
	tradDiv(algoDiv);

	// creation du texte VS
	const current_game = document.createElement('div');
	current_game.className = 'col-12 fs-3';
	current_game.textContent = pair[0] + " vs " + pair[1];
	current_game.style.color = 'white';
	current_game.setAttribute('data-translate', 'true');

	// creation du btn VS
	const startBtn = document.createElement('button');
	startBtn.className = 'btn btn-outline-light m-2 text-center rounded-pill';
	startBtn.textContent = 'Commencer !';
	startBtn.setAttribute('data-translate', 'true');
	tradDiv(startBtn);

	const newDiv = document.createElement('div');
	newDiv.className = 'p-2 rounded-pill m-5 d-inline-block bubble';
	newDiv.appendChild(current_game);
	newDiv.appendChild(startBtn);

	addEvent(pair[0], pair[1], startBtn, uuid);

	algoDiv.appendChild(newDiv);
	newDiv.style.border = '3px solid white';

}

async function affTournamentBracket_start(player_list, uuid)
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = getHTML();
	let result;

	if (player_list !== null)
		result = await affTournamentBracket_sendRequest({'player_list': player_list, 'uuid': uuid}, 'startTournament');
	else
	{
		result = await affTournamentBracket_sendRequest({'uuid': uuid}, 'continueTournament');
		if (result.return && result.return === "endTournament") {
			addScript('/js/aff_tournament_leaderboard.js', () => {callbackTournamentBraquet(result)});
			console.log("endTournament");
			return;
		}
	}
	if (result.pairs)
		result.pairs.forEach(pair => paringPrintLoop(pair, uuid));
	tradNewPage();
}

function addEvent(player1, player2, startBtn, uuid)
{
	startBtn.addEventListener('click', async function()
	{
		let result = await affTournamentBracket_sendRequest({
			'player1': player1,
			'player2': player2,
			 'uuid': uuid
		}, 'startGame');
		if (result.return && result.return === "startGame")
		{
			startBtn.removeEventListener('click', function(){});
			addScript('/js/aff_pong.js', () => affPong(player1, player2, uuid));
		}
	});
}

async function affTournamentBracket_sendRequest(data, function_name)
{
	try {

		const response = await fetch('/api/tournament/'+ function_name + '/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include'
		});
		const result = await response.json();

		if (result.detail === 'Unauthorized')
		{
			updatePage("denied");
		}
		return (result);
	}
	catch (error) {
		console.error('Erreur lors de la requête :', error);
	}
}

function getHTML()
{
	return (`
	<h1 class="display-1 text-center" data-translate="true">Déroulement des matchs</h1>

	<div class="container text-center" id="algo" data-translate="true" >
	</div>
	`)
}
