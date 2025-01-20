function callbackDuplicate()
{
	canvas = document.getElementById('duplicateCanvas')
	loadDuplicatePong(canvas)
}
function affDuplicate()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-5 fw-bold" data-translate="true">Erreur</h1>
				<div class="canvas-container">
					<canvas id="duplicateCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 class="fw-bold" data-translate="true">Vous êtes déjà connecté !</h2>
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="">Revenir à l'accueil</button>
						<p class="mt-1 mb-0" id="logout"><span class="logout-btn fs-6 fw-bold text-white px-2 py-1 border border-2 rounded bg-danger" data-translate="true">Se Déconnecter</span></p>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
	document.getElementsByClassName("replayBlock")[0].style.display = "block"
	document.getElementById('logout').addEventListener("click", () => logoutUser())
	addScript("/js/duplicatePong.js", callbackDuplicate)
	tradNewPage()
	getLinks()
	console.log("prout")
}
