function loginCallback()
{
	loadLogin()
}

function loginAnimationCallback()
{
	canvas = document.getElementById("loginCanvas")
	loadAnimationLogin(canvas)
}

function affAuthentification()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-5 fw-bold" data-translate="true">Connexion</h1>
				<div class="canvas-container">
					<canvas id="loginCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<form id="loginForm">
							<div class="form-group">
								<label for="username" class="mb-2 fw-bold" data-translate="true">Nom d'utilisateur</label>
									<input type="text" class="form-control mb-2" id="username" data-translate="placeholder" placeholder="Entrez votre nom d'utilisateur" required>
							</div>
							<div class="form-group">
								<label for="password" class="mb-2 fw-bold" data-translate="true">Mot de passe</label>
									<input type="password" class="form-control mb-3" id="password" data-translate="placeholder" placeholder="Entrez votre mot de passe" required>
							</div>
							<button type="submit" class="btn btn-primary mb-4" data-translate="true">Se connecter</button>
						</form>
						<p class="link-p fs-6 fw-bold text-white mb-0" id="register" data-translate="true"> Pas de compte ? Inscrivez-vous</p>
					</div>
				</div>
			</div>
		</div>
	</div>
	`
	/* Verifier egalement en back les donnees envoyees */
	addScript("/js/login.js", loginCallback)
	addScript("/js/loginPong.js", loginAnimationCallback)
	forms = document.querySelectorAll('input')
	setFormsAlert(forms)
	document.querySelectorAll('.replayBlock')[0].style.display = "block"
	tradNewPage()
	let registerParam = document.getElementById("register")
	registerParam.addEventListener("click", () => updatePage(registerParam.id))
	let buttons = document.querySelectorAll('main button')
	buttons.forEach( button => {
	if (button.type !== "submit")
	button.addEventListener("click", () => updatePage(button.value))
	})
}
