function callback404()
{
	init404Pong()
}
function aff404()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-5 fw-bold" data-translate="true">Erreur</h1>

				<div class="canvas-container">
					<canvas id="404Canvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 class="fw-bold" data-translate="true">Page introuvable</h2>
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="">Revenir à l'accueil</button>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
    document.getElementsByClassName("replayBlock")[0].style.display = "block"
    addScript("/js/404Pong.js", callback404)
    tradNewPage()
    getMainButtons()
}
