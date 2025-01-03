function loginCallback()
{
	loadLogin()
}

function affAuthentification()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<div class="container mt-5">
		<h2>Connexion</h2>
		<form id="loginForm">
			<div class="form-group">
				<label for="username" data-translate="true">Nom d'utilisateur</label>
				<input type="text" class="form-control" id="username" data-translate="placeholder" placeholder="Entrez votre nom d'utilisateur" required>
			</div>
			<div class="form-group">
				<label for="password" data-translate="true">Mot de passe</label>
				<input type="password" class="form-control" id="password" data-translate="placeholder" placeholder="Entrez votre mot de passe" required>
			</div>
			<button type="submit" class="btn btn-primary" data-translate="true">Se connecter</button>
		</form>
		<div id="error-message" class="mt-3 text-danger"></div>
		<section>
			<button type="button" class="btn btn-dark" data-translate="true" value="register"> Créer un compte</button>
			<button type="button" class="btn btn-dark" data-translate="true" value="registertoft"> Connexion avec 42</button>
		</section>
	</div>
	`
	addScript("/js/login.js", loginCallback)
	tradNewPage()
	let buttons = document.querySelectorAll('main button')
	buttons.forEach( button => {
	if (button.type !== "submit")
	button.addEventListener("click", () => updatePage(button.value))
	})
}
