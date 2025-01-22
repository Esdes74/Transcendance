function registerCallback()
{
	loadRegister()
}

function registerAnimationCallback()
{
	canvas = document.getElementById("loginCanvas")
	loadAnimationLogin(canvas)
}

function affRegister()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
	<div class="container text-center my-5">
	<div class="row justify-content-center">
		<div class="col-md-8">
			<h1 class="mb-5 fw-bold" data-translate="true">Création de compte</h1>
			<div class="canvas-container">
			<canvas id="loginCanvas" class="w-100" height="400"></canvas>
			<div class="replayBlock">
        			<form id="loginForm">
                			<label for="username" class="mb-1 fw-bold" data-translate="true">Nom d'utilisateur</label>
                			<input type="text" class="form-control mb-2" id="username" data-translate="placeholder" placeholder="Entrez votre nom d'utilisateur" required>
             				<label for="password" class="mb-1 fw-bold" data-translate="true">Mot de passe</label>
					<input type="password" class="form-control mb-2" id="password" data-translate="placeholder" placeholder="Entrez votre mot de passe" autocomplete="defaultpswd" required>
             				<label for="confirmed-password" class="mb-1 fw-bold" data-translate="true">Confirmer le mot de passe</label>
              				<input type="password" class="form-control mb-2" id="confirmed-password" data-translate="placeholder" placeholder="Confirmez votre mot de passe" autocomplete="defaultpswd" required>
            				<label for="mail" class="mb-1 fw-bold">E-Mail</label>
          				<input type="email" class="form-control mb-2" id="mail" data-translate="placeholder" placeholder="Entrez votre e-mail" required>
            				<button type="submit" class="btn btn-outline-light fw-bold mt-2 mb-2" data-translate="true">S'inscrire</button>
				</form>
				<p class="mt-2 mb-0" id="error-message" data-translate="true"></p>
 			</div>
			</div>
		</div>
	</div>
	</div>
    `
	addScript("/js/register.js", registerCallback)
	addScript("/js/waitingPong.js", registerAnimationCallback)
	document.querySelectorAll('.replayBlock')[0].style.display = "block"
	tradNewPage()
}
