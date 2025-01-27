function auth42Callback()
{
	loadAuth42Callback()
}

function callbackWaitingPong()
{
	canvas = document.getElementById("callback42AuthCanvas")
	loadAnimationLogin(canvas)
}

function affAuth42Callback()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<div class="canvas-container">
					<canvas id="callback42AuthCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
					<h2 class="fw-bold" data-translate="true">Erreur lors de la redirection</h2>
					<button class="btn btn-outline-light m-2 fw-bold" id="index" data-translate="true"> Revenir à l'accueil</button>
					</div>
				</div>
			</div>
		</div>
		</div>
	`
	addScript("/js/auth42Callback.js", auth42Callback)
	addScript("/js/waitingPong.js", callbackWaitingPong)
	tradNewPage()
	getLinks()
}
