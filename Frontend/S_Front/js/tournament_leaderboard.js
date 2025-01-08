
async function aff_leaderboard(leaderboard)
{
	let docMain = document.querySelector('main')
	// <button class="btn btn-outline-light m-2" id="start" data-translate="true">Start the Game (lance pong.js)</button>
	docMain.innerHTML = `
	<h1 class="display-1">Leaderboard</h1>

	<div id="algo">
		<div class="container text-center">
			<div id="player-list" class="row row-cols-1 justify-content-center mt-2">

			</div>
		</div>
	</div>
	`

	const divElement = document.getElementById('algo');
	result = await affTournamentBracket_sendRequest({}, 'continueTournament');
	if (result.return == "endTournament")
	{
		addScript('/js/tournament_leaderboard.js', () => leaderboard());
		console.log("endTournament");
		return;
	}
	console.log("NOUVEAU result : ", result);

	leaderboard.forEach(player => {
		const current_game = document.createElement('div');
		current_game.className = 'col';
		current_game.textContent = player;
		divElement.appendChild(current_game);
	});
}
