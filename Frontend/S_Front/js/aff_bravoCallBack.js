function bravoFct()
{
	loadBravoCallBack()
}

function callbackBravo()
{
	canvas = document.getElementById("callbackCanvas")
	loadAnimationLogin(canvas)
}

function affBravoCallBack()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="canvas-container">
					<canvas id="callbackCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
					<h2 class="fw-bold" data-translate="true">Erreur lors de la redirection</h2>
					<button class="btn btn-outline-light m-2 fw-bold" id="index" data-translate="true"> Revenir à l'accueil</button>
					</div>
				</div>
			</div>
		</div>
		</div>
	`
	addScript("/js/bravoCallBack.js", bravoFct)
	addScript("/js/waitingPong.js", callbackBravo)
	document.querySelectorAll('.replayBlock')[0].style.display = "block"
	tradNewPage()
	getLinks()
}
