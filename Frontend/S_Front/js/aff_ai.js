function callbackAI()
{
    menuCanvas = document.getElementById("menuCanvas")
    initAnimation(menuCanvas)
}

function other()
{
	AICanvas = document.getElementById("AICanvas")
	initPong(AICanvas)
}

function createReplayBlock()
{
	myDiv = createElement(div)
	
}

function affReplayBlock()
{
	menu = document.querySelector(".replayBlock")
	menu.innerHTML = `<div class="button-group">
                                                <h2 id="winMessage"></h2>
                                                <div class="button-group">
                                                <button class="btn btn-outline-light m-2 fw-bold" data-translate="true">Replay</Button>
                                                <button class="btn btn-outline-light m-2 fw-bold" data-translate="true">Change Difficulty</button>
   			</div>`
	tradDiv(menu)
	replayButtons = document.querySelectorAll('main button')
	replayButtons.forEach( replayButton => {
		replayButton.addEventListener("click", () => {
			scorePlayer1 = document.getElementById("scorePlayer1")
			scorePlayer2 = document.getElementById("scorePlayer2")
			scorePlayer1.innerText = "0"
			scorePlayer2.innerText = "0"
			menu.style.display = "none"
			addScript("/js/pong.js", other)
		})
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
		aiCanvas.id = "AICanvas"
		aiCanvas.class = "w-100"
		aiCanvas.height = 400
		parents.append(aiCanvas)
		affReplayBlock()
		document.querySelector(".replayBlock").style.display = "none"
		addScript("/js/pong.js", other)
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
				<h1 class="mb-4 fw-bold" data-translate="true">Mode Solo</h1>
				<div class="score-board d-flex justify-content-around mb-3">
					<div id="scorePlayer1" class="fs-2">0</div>
					<div id="scorePlayer2" class="fs-2">0</div>
				</div>
				<div class="score-names d-flex pb-0 mb-0 justify-content-between align-items-end">
					<div id="namePlayer1" class="d-flex pb-0 mb-0 align-items-end">You</div>
					<div id="namePlayer2" class="d-flex pb-0 mb-0 align-items-end">Bot</div>
				</div>	
				<div class="canvas-container p-0">
					<canvas id="menuCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<!--h2 id="winMessage"></h2>
						<div class="button-group">
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true">Replay</button>
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true">Change Difficulty</button-->

						<h2 class="fw-bold" data-translate="true"> Difficulté :</h2>
						<div class="button-group">
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="easyMode">Facile</button>
						<!--button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="normalMode">Intermediaire</button>
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="hardMode">Pongiste Professionnel</button-->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
    document.querySelector(".replayBlock").style.display = "block"
    addScript("/js/indexPong.js", callbackAI)
    tradNewPage()
    manageButtons()
}
