function affIndex()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
       	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-4 fw-bold" data-translate="true">PONG MAJESTUEUX</h1>

				<div class="canvas-container">
					<!-- <div id="countdown" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 48px; color: white;"></div> -->
					<canvas id="pongCanvas" class="w-100" height="400"></canvas>
					<div id="replayBlock">
						<h2 class="fw-bold" data-translate="true">Login to play</h2>
						<div class="button-group">
						<button id="YES" class="btn btn-outline-light m-2 fw-bold" data-translate="true">Login</button>
						<button id="BTH" class="btn btn-outline-light m-2 fw-bold" data-translate="true">Register</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
    document.getElementById("replayBlock").style.display = "block"
    if (!addScript("/js/indexPong.js"))
	initIndexPong()
    tradElements()
}

pages["/"].funct = affIndex
affIndex()
