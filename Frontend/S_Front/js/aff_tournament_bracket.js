function paringPrintLoop(pair)
{
	const current_game = document.createElement('div');
	current_game.className = 'col';
	current_game.textContent = pair[0] + " vs " + pair[1];
	const divElement = document.getElementById('algo');
	divElement.appendChild(current_game);
	readyState(pair[0], pair[1], divElement);
}

async function affTournamentBracket_start(player_list)
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = getHTML();
	let result;

	if (player_list !== null)
		result = await affTournamentBracket_sendRequest({'player_list': player_list}, 'startTournament');
	else
	{
		console.log("wai on continue bien !")
		result = await affTournamentBracket_sendRequest({}, 'continueTournament');
		if (result.return === "endTournament") {
			addScript('/js/tournament_leaderboard.js', () => aff_leaderboard(result));
			console.log("endTournament");
			return;
		}
	}
	result.pairs.forEach(pair => paringPrintLoop(pair));
}

function readyState(player1, player2, divElement)
{
	const startBtn = document.createElement('button');
	startBtn.className = 'btn btn-outline-light m-2';
	startBtn.textContent = 'Start Game !';
	divElement.appendChild(startBtn);
	startBtn.addEventListener('click', async function()
	{
		let result = await affTournamentBracket_sendRequest({
			'player1': player1,
			'player2': player2
		}, 'startGame');
		if (result.return === "startGame")
		{
			startBtn.removeEventListener('click', function(){});
			addScript('/js/aff_pong.js', () => affPong(player1, player2));
		}
	});
}

async function affTournamentBracket_sendRequest(data, function_name)
{
	const response = await fetch('/api/tournament/'+ function_name + '/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		credentials: 'include'
	});
	return (await response.json());
}

function getHTML()
{
	return (`
	<h1 class="display-1">Matchmaking</h1>

	<div id="algo">
		<div class="container text-center">
			<div id="player-list" class="row row-cols-1 justify-content-center mt-2">

			</div>
		</div>
	</div>
	`)
}
