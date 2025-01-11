function callback50X()
{
	canvas = document.getElementById("50XCanvas")
	initExplodingPong(canvas)
}
function aff50X()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-5 fw-bold" data-translate="true">Erreur Serveur</h1>

				<div class="canvas-container">
					<canvas id="50XCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 class="fw-bold" data-translate="true">Service Indisponible</h2>
						<div class="button-group">
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="">Revenir à l'accueil</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
    document.getElementsByClassName("replayBlock")[0].style.display = "block"
    addScript("/js/explodingPong.js", callback50X)
    tradNewPage()
    getMainButtons()
}
