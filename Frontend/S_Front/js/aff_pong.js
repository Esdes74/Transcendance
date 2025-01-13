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
				<h1 class="display-1">PONG</h1>

				<h1 class="d-flex justify-content-around mb-3">
					<div id="Player1" class="fs-2">${Player1}</div> <!-- joueur 1 -->
					<div id="Player2" class="fs-2">${Player2}</div> <!-- joueur 2 -->
				</h1>

				<div class="score-board d-flex justify-content-around mb-3">
					<div id="scorePlayer1" class="fs-2">0</div> <!-- Score du joueur 1 -->
					<div id="scorePlayer2" class="fs-2">0</div> <!-- Score du joueur 2 -->
				</div>
				<div class="canvas-container">
					<canvas id="pongCanvas"></canvas>
					<div class="replayBlock">
						<h2 id="winMessage"></h2>
						<div class="button-group">
							<button class="btn btn-outline-light m-2" data-translate="true" value="pong">Rejouer</button>
							<button class="btn btn-outline-light m-2" data-translate="true" value="settings" >Paramètres</button>
							<button class="btn btn-outline-light m-2" data-translate="true" value="index">Retour à l'accueil</button>
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
