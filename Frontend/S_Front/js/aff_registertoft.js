function registerToFTCallback()
{
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
				<h1 class="mb-5 fw-bold" data-translate="true">Authentification 42</h1>
				<div class="canvas-container">
				<canvas id="loginCanvas" class="w-100" height="400"></canvas>
				<div class="replayBlock">
					<h5>Please wait until redirect to 42 connection</h1>
					<h5>Not getting redirected ? click here </h5>
				</div>
			</div>
		</div>
	</div>
	`
	addScript("/js/registertoft.js", registerToFTCallback)
	addScript("/js/waitingPong.js", ftWaitAnimationCallback)
	document.querySelector('.replayBlock').style.display = "block"
	tradNewPage()
}
