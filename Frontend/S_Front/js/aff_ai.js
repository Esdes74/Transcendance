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
				<div class="canvas-container">
					<canvas id="menuCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 class="fw-bold" data-translate="true">Difficulté</h2>
						<div class="button-group">
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="authentificatio">Très Facile</button>
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="authentification">Facile</button>
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="register">Intermediaire</button>
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="OSCOUR">Pongiste Professionel</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
    document.getElementsByClassName("replayBlock")[0].style.display = "block"
    addScript("/js/indexPong.js", callbackAI)
    tradNewPage()
    buttons = document.querySelectorAll('main button')
    buttons.forEach( button => {
	button.addEventListener("click", () => {
	canvas = document.getElementById("menuCanvas")
	console.log(canvas.id)
	parents = canvas.parentElement
	canvas.remove()
	let a = document.createElement("canvas")
	a.id = "AICanvas"
	a.class = "w-100"
	a.height = 400
	parents.append(a)
	document.getElementsByClassName("replayBlock")[0].style.display = "none"
	addScript("/js/pong.js", other)
	})
	})
}
