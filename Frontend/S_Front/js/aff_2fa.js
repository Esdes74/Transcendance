function twofaCallback()
{
	load2faLogin()
}

function twofaAnimationCallback()
{
	canvas = document.getElementById("loginCanvas")
	loadAnimationLogin(canvas)
}

function aff2fa()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-5 fw-bold" data-translate="true">Double Authentification</h1>
				<div class="canvas-container">
				<canvas id="loginCanvas" class="w-100" height="400"></canvas>
				<div class="replayBlock">
				<form id="loginForm">
					<div class="form-group">
						<label for="password" class="mb-3 fw-bold" data-translate="true">Code envoyé sur votre boite mail</label>
						<div class="mb-3 fs-6 fw-bold text-white" data-translate="true">Le code expirera dans 3 minutes.</div>
						<input type="password" class="form-control mb-3" id="password" data-translate="placeholder" placeholder="Entrez le code secret" required>
						<p class="mt-2"><span class="text-white rounded fw-bold fs-7" id="error-message" data-translate="true"></span></p>
					</div>
					<button type="submit" class="btn btn-outline-light fw-bold mb-3" data-translate="true">Valider</button>
				</form>
				<p class="link-p fs-6 fw-bold text-white mb-0" id="send-again" data-translate="true"> Envoyer un nouveau code</p>	
			</div>
    `
	addScript("/js/2fa.js", twofaCallback)
	addScript("/js/waitingPong.js", twofaAnimationCallback)
	document.querySelector('.replayBlock').style.display = "block"
	forms = document.querySelectorAll('input')
	setFormsAlert(forms)
	tradNewPage()
}
