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
				<h1 class="mb-4 fw-bold" data-translate="true">Pong Majestueux</h1>
				<div class="canvas-container">
					<canvas id="indexCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 class="fw-bold" data-translate="true">Bienvenue</h2>
						<div class="button-group">
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="authentification">Solo</button>
						<button class="btn btn-outline-light m-2 fw-bold" data-translate="true" value="register">Duo </button>
						<span data-bs-toggle="tooltip" data-bs-placement="bottom" title='Log-in to play tournaments'>
							<button disabled style="pointer-events: none;" class="btn btn-outline-light fw-bold" value="register"><span data-translate="true">Tournoi</span> <i class="bi bi-exclamation-triangle m-2 fw-bold col-6"></i>
							</button>
						</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
	const tooltipElement = document.querySelector('[data-bs-toggle="tooltip"]');
	const originalTitle = tooltipElement.getAttribute('title');
	console.log(document.getElementById('tooltip'))
	console.log(originalTitle)
    var tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl, {
			html: true
		})
	})
	/*if (is_logged())
	{

	}*/
    document.getElementsByClassName("replayBlock")[0].style.display = "block"
    addScript("/js/indexPong.js", callbackIndex)
    tradNewPage()
    getMainButtons()
}
