function callbackAI()
{
    AICanvas = document.getElementById("AICanvas")
    initAnimation(AICanvas)
}

function affAI()
{
    let docMain = document.querySelector('main')
   	docMain.innerHTML = `
       	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-4 fw-bold" data-translate="true">Mode Solo</h1>

				<div class="canvas-container">
					<!-- <div id="countdown" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; color: white;"></div> -->
					<canvas id="AICanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<h2 class="fw-bold" data-translate="true">Difficulté</h2>
						<div class="button-group">
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
}
