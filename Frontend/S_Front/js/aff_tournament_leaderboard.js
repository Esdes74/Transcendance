function callbackLeaderboard()
{
	LeaderboardCanvas = document.getElementById("LeaderboardCanvas")
	initAnimation(LeaderboardCanvas)
}

async function aff_leaderboard(result)
{
	let docMain = document.querySelector('main')
	// <button class="btn btn-outline-light m-2" id="start" data-translate="true">Start the Game (lance pong.js)</button>
	docMain.innerHTML = `

	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
			<h1 class="mb-5 fw-bold" data-translate="true">Fin du tournoi</h1>
			<div class="canvas-container">
			<canvas id="LeaderboardCanvas" class="w-100" height="400"></canvas>
			<div class="replayBlock">
						<h1 class="mb-5 fw-bold" data-translate="true">Résultats</h1>
						<div id="ladder">
						</div>

						<button id="bthBtn" class="tournament-btn rounded mt-3" data-translate="true" >Revenir à l'accueil</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	`

	addScript('/js/indexPong.js', callbackLeaderboard);
	document.querySelector(".replayBlock").style.display = "block"

	const ladderDiv = document.getElementById('ladder');
	result.leaderboard.forEach((player, index) => {
		
		const playerContainer = document.createElement('div');
		
		const indexDiv = document.createElement('div');
		indexDiv.className = 'px-3 fw-bolder fst-italic';
		indexDiv.textContent = index + 1;

		const nameDiv = document.createElement('div');
		nameDiv.className = 'mx-auto';
		nameDiv.textContent = player;
		
		const scoreDiv = document.createElement('div');
		scoreDiv.className = 'px-3';
		scoreDiv.textContent = result.score[index];
		
		playerContainer.className = 'd-flex align-items-center my-3 py-2 player-container rounded-pill';
		playerContainer.appendChild(indexDiv);
		playerContainer.appendChild(nameDiv);
		playerContainer.appendChild(scoreDiv);


		ladderDiv.appendChild(playerContainer);
	});
	tradNewPage();
	bthBtn.addEventListener('click', function() {
		updatePage("");
	});
}
