function affPong()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-4">PONG</h1>

				<!-- SCOREBOARD -->
				<div class="score-board d-flex justify-content-around mb-3">
					<div id="scorePlayer1" class="fs-2">0</div> <!-- Score du joueur 1 -->
					<div id="scorePlayer2" class="fs-2">0</div> <!-- Score du joueur 2 -->
				</div>
				<div class="canvas-container">
					<!-- <div id="countdown" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; color: white;"></div> -->
					<canvas id="pongCanvas" class="w-100" height="400"></canvas>
					<div id="replayBlock">
						<h2 id="winMessage"></h2>
						<div class="button-group">
							<button id="YES" class="btn btn-outline-light m-2" data-translate="true">Rejouer</button>
							<button id="SETTING" class="btn btn-outline-light m-2" data-translate="true">Paramètres</button>
							<button id="BTH" class="btn btn-outline-light m-2" data-translate="true">Retour à l'accueil</button>
							<!-- \todo: href les buttons -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`	
	if (!addScript("/js/pong.js"))
	{
		initPong()
	}
	tradNewPage()
}

pages["/pong"].funct = affPong
affPong()
