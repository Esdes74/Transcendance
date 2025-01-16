function affPong(Player1, Player2)
{
	let tournoi = true;

	if (Player1 === undefined && Player2 === undefined)
	{
		console.log("Player1 et Player2 undefined")
		Player1 = "Player1";
		Player2 = "Player2";
		tournoi = false;
	}

	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-2 fw-bold" data-translate="true">Mode Duel</h1>

				<div class="score-board d-flex justify-content-around">
					<div id="scorePlayer1" class="fs-2">0</div>
					<div id="scorePlayer2" class="fs-2">0</div>
				</div>

				<h1 class="score-names d-flex justify-content-between align-items-end">
					<div id="Player1" class="fs-2" data-translate="true">${Player1}</div>
					<div id="Player2" class="fs-2" data-translate="true">${Player2}</div>
				</h1>

				<div class="canvas-container p-0">
					<canvas id="pongCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 id="winMessage" data-translate="true"></h2>
						<h2 id=WinMsg data-translate="true">a gagné</h2>
						<div class="button-group">
							<button class="btn btn-outline-light m-2" data-translate="true" value="pong">Rejouer</button>
							<button class="btn btn-outline-light m-2" data-translate="true" value="index">Revenir à l'accueil</button>
							<button class="btn btn-outline-light m-2" id="nextButton" data-translate="true" value="tournament_bracket">Suivant</button>
							</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`	
	pongCanvas = document.getElementById("pongCanvas")
	addScript("/js/pong.js", () => initPong(tournoi, pongCanvas))
	// addScript("/js/pong.js", () => pongCallback(Player1, Player2))
	tradNewPage()
}
