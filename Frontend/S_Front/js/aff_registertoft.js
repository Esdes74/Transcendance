function registerToFTCallback()
{
	console.log("Prout hihi")
	loadRegisterToFT()
}

function ftWaitAnimationCallback()
{
	canvas = document.getElementById("loginCanvas")
	loadAnimationLogin(canvas)
}

function affRegisterToFT()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-5 fw-bold" data-translate="true">Authentification avec 42</h1>
				<div class="canvas-container">
				<canvas id="loginCanvas" class="w-100" height="400"></canvas>
				<div class="replayBlock">
					<p class="fs-5 fw-bold" data-translate="true">Attente de la redirection vers 42...</p>
					<p class="link-p fs-6 fw-bold text-white" id="redirect" data-translate="true">Pas automatiquement redirigé ? Cliquez ici</p>
					<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="">Revenir à l'accueil</button>
				</div>
			</div>
		</div>
	</div>
	`
	addScript("/js/registertoft.js", registerToFTCallback)
	addScript("/js/waitingPong.js", ftWaitAnimationCallback)
	document.querySelector('.replayBlock').style.display = "block"
	document.getElementById("redirect").addEventListener("click", () => registerToFTCallback())
	tradNewPage()
	getMainButtons()
}
