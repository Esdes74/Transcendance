function callbackAI()
{
    menuCanvas = document.getElementById("menuCanvas")
    initAnimation(menuCanvas)
}

function initAIPong(mode)
{
	AICanvas = document.querySelector('canvas')
	initPong(false, AICanvas, null)
}

function createReplayBlock()
{
	myDiv = createElement(div)	
}

function affReplayBlock()
{
	menu = document.querySelector(".replayBlock")
	menu.innerHTML = `
				<h2><span class="d-inline" id="winMessage"></span><span class="d-inline ms-2" id="WinMsg" data-translate="true">a gagné</span></h2>
				<h2 class="fw-bold mt-2 mb-3" data-translate="true">Rejouer</h2>
				<button class="btn btn-outline-light m-2 fw-bold" style="width: 100px;" data-translate="true" data-difficulty="easy">Facile</button>
				<button class="btn btn-outline-light m-2 fw-bold" style="width: 100px;" data-translate="true" data-difficulty="medium">Normale</button>
				<button class="btn btn-outline-light m-2 fw-bold" style="width: 100px;" data-translate="true" data-difficulty="hard">Difficile</button>
   			`
	tradDiv(menu)
	replayButtons = document.querySelectorAll('main button')
	replayButtons.forEach( replayButton => {
		replayButton.addEventListener("click", () => {
			scorePlayer1 = document.getElementById("scorePlayer1")
			scorePlayer2 = document.getElementById("scorePlayer2")
			scorePlayer1.innerText = "0"
			scorePlayer2.innerText = "0"
			AICanvas = document.querySelector('canvas')
			if (replayButton.getAttribute('data-difficulty') == "easy")
				AICanvas.id = "AICanvasEasy"
			else if (replayButton.getAttribute('data-difficulty') == "medium")
				AICanvas.id = "AICanvasMedium"
			else
				AICanvas.id = "AICanvasHard"
			menu.style.display = "none"
			addScript("/js/pong.js", initAIPong)
		})
	})
}

function shiningButtons()
{
	document.addEventListener('keydown', function(event) {
		if (event.key === "w" || event.key === "W")
		{
			upDiv = (document.getElementById("keyup"))
			upDiv?.classList.remove('bg-dark')
			upDiv?.classList.add('bg-secondary')
		}
		if (event.key === "s" || event.key === "S")
		{
			downDiv = (document.getElementById("keydown"))
			downDiv?.classList.remove('bg-dark')
			downDiv?.classList.add('bg-secondary')
		}
	})
	document.addEventListener('keyup', function(event) {
		if (event.key === "w" || event.key === "W")
		{
			upDiv = (document.getElementById("keyup"))
			upDiv?.classList.remove('bg-secondary')
			upDiv?.classList.add('bg-dark')
		}
		if (event.key === "s" || event.key === "S")
		{
			downDiv = (document.getElementById("keydown"))
			downDiv?.classList.remove('bg-secondary')
			downDiv?.classList.add('bg-dark')
		}
	})
}

function manageButtons()
{
	buttons = document.querySelectorAll('main button')
	buttons.forEach( button => {
	button.addEventListener("click", () => {
		canvas = document.getElementById("menuCanvas")
		parents = canvas.parentElement
		canvas.remove()
		let aiCanvas = document.createElement("canvas")
		if (button.getAttribute('data-difficulty') == "easy")
			aiCanvas.id = "AICanvasEasy"
		else if (button.getAttribute('data-difficulty') == "medium")
			aiCanvas.id = "AICanvasMedium"
		else
			aiCanvas.id = "AICanvasHard"
		aiCanvas.class = "w-100"
		aiCanvas.height = 400
		parents.append(aiCanvas)
		affReplayBlock()
		document.querySelector(".replayBlock").style.display = "none"
		addScript("/js/pong.js", initAIPong)
		})
	})
}

function affAI()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-2 fw-bold" data-translate="true">Mode Solo</h1>
				<div class="score-board d-flex justify-content-around">
					<div id="scorePlayer1" class="fs-2">0</div>
					<div id="scorePlayer2" class="fs-2">0</div>
				</div>
				<div class="score-names d-flex justify-content-between align-items-end">
					<div id="Player1" class="d-flex pb-0 mb-0 align-items-end" data-translate="true">Joueur</div>
					<div id="Player2" class="d-flex pb-0 mb-0 align-items-end">Bot</div>
				</div>	
				<div class="canvas-container p-0">
					<canvas id="menuCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 class="fw-bold" data-translate="true">Touches :</h2>
						<div class="button-group">
						</div>
						<div class="container">
							<div class="row mt-2 mb-2">
								<div class="col-6 d-flex justify-content-end align-items-center fw-bold" data-translate="true">
									Haut
								</div>
								<div id="keyup" class="col-2 border bg-dark d-flex justify-content-center align-items-center fs-6" style="height: 55px;">
									W
								</div>
							</div>
							<div class="row mb-2">
								<div class="col-6 d-flex justify-content-end align-items-center fw-bold" data-translate="true">
									Bas 
								</div>
								<div id="keydown" class="col-2 border bg-dark d-flex justify-content-center align-items-center fs-6" style="height: 55px;">
									S
								</div>
							</div>
						</div>
						<h2 class="fw-bold mt-3" data-translate="true">Difficulté :</h2>
						<button class="btn btn-outline-light m-2 fw-bold" style="width: 100px;" data-translate="true" data-difficulty="easy">Facile</button>
						<button class="btn btn-outline-light m-2 fw-bold" style="width: 100px;" data-translate="true" data-difficulty="medium">Normal</button>
						<button class="btn btn-outline-light m-2 fw-bold" style="width: 100px;" data-translate="true" data-difficulty="hard">Difficile</button>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
    document.querySelector(".replayBlock").style.display = "block"
    shiningButtons()
    addScript("/js/indexPong.js", callbackAI)
    tradNewPage()
    manageButtons()
}
