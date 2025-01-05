function callbackIndex()
{
    indexCanvas = document.getElementById("indexCanvas")
    initAnimation(indexCanvas)
}

function affIndex()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-4 fw-bold"><span data-translate="true">Bienvenue</span></h1>
				<div class="canvas-container">
					<canvas id="indexCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 class="fw-bold" data-translate="true">Jouer :</h2>
						<div class="button-group">
						<button data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="right" data-translate="tooltips" data-bs-original-title="Affronte une IA au Pong!" class="btn btn-outline-light m-2 fw-bold" value="ai"><span data-translate="true">Solo</span></button>
						<button data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="right" data-translate="tooltips" data-bs-original-title="1vs1 en local contre un ami!" class="btn btn-outline-light m-2 fw-bold" value="pong"><span data-translate="true">Duel</span></button>
						<span data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="right" data-translate="tooltips" data-bs-original-title="Connecte-toi pour créer un tournoi">
							<button disabled style="pointer-events: none;" class="btn btn-outline-light fw-bold" value="tournament"><span data-translate="true">Tournoi</span> <i class="bi bi-exclamation-triangle m-2 fw-bold col-6"></i>
							</button>
						</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
        tooltipList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipList.forEach(function (tooltip) {
            new bootstrap.Tooltip(tooltip) })

	document.querySelectorAll('.replayBlock')[0].style.display = "block"
	addScript("/js/indexPong.js", callbackIndex)
	tradNewPage()
	getMainButtons()
}
