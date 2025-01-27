function callbackTournamentBraquet(result)
{
	aff_leaderboard(result)
}

function callbackBracket()
{
	bracketCanvas = document.getElementById("bracketCanvas")
	initAnimation(bracketCanvas)
}

function paringPrintLoop(pair, uuid)
{
	const algoDiv = document.getElementById('algo');
	tradDiv(algoDiv);

	// creation du texte VS
	const current_game = document.createElement('div');
	current_game.className = 'mb-2 fs-5 fw-bold';
	current_game.textContent = pair[0] + " vs " + pair[1];
	current_game.style.color = 'white';
	current_game.setAttribute('data-translate', 'true');

	// creation du btn VS
	const startBtn = document.createElement('button');
	startBtn.className = 'btn btn-outline-light text-center rounded-pill';
	startBtn.textContent = 'Commencer !';
	startBtn.setAttribute('data-translate', 'true');
	tradDiv(startBtn);

	const newDiv = document.createElement('div');
	newDiv.className = 'py-2 rounded-pill my-2 d-inline-block bubble';
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
	addScript('/js/indexPong.js', callbackBracket);
	document.querySelector(".replayBlock").style.display = "block"
	curr_round = 1;
	roundDiv = document.getElementById('round')
	let result;

	if (player_list !== null)
	{
		roundDiv.textContent = roundDiv.textContent + ` ${curr_round}`;
		result = await affTournamentBracket_sendRequest({'player_list': player_list, 'uuid': uuid}, 'startTournament');
		if (result === undefined)
			return;
	}
	else
	{
		result = await affTournamentBracket_sendRequest({'uuid': uuid}, 'continueTournament');
		if (result === undefined)
			return;
		curr_round = result.round;
		roundDiv.textContent = roundDiv.textContent + ` ${curr_round}`;
		if (result.return && result.return === "endTournament") {
			addScript('/js/aff_tournament_leaderboard.js', () => {callbackTournamentBraquet(result)});
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
		if (result === undefined)
			return;
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

		if (response.status >= 500 && response.status < 600)
		{
			updatePage("50X");
			return;
		}

		const result = await response.json();

		if (result.error === 'Unauthorized')
		{
			updatePage("denied");
			return;
		}
		return (result);
	}
	catch (error) {
		updatePage("50X");
	}
}

function getHTML()
{
	return (`
	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="canvas-container mt-5">
					<canvas id="bracketCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 class="fw-bold text-center mb-3" data-translate="true" id="round">Tour</h1>
						<div class="container text-center" id="algo" data-translate="true" > </div>
					</div>
				</div>
			</div>
		</div>
	</div>
	`)
}
