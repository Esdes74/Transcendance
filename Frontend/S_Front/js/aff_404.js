function aff404()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
       	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="fw-bold">Error</h1>

				<div class="canvas-container">
					<canvas id="pongCanvas" class="w-100" height="400"></canvas>
					<div id="replayBlock">
						<h2 class="fw-bold">File not found</h2>
						<div class="button-group">
						<button id="404index" class="btn btn-outline-light m-2 fw-bold">Return to index</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
    document.getElementById("replayBlock").style.display = "block"
    if (!addScript("/js/404Pong.js"))
    {
	init404Pong()
    }
}

pages["/404"].funct = aff404
aff404()
