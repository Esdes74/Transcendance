function aff2fa()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<div class="container mt-5">
		<h2>Connexion</h2>
		<form id="loginForm">
			<div class="form-group">
				<label for="password">Mot de passe</label>
				<input type="password" class="form-control" id="password" placeholder="Entrez votre mot de passe" required>
			</div>
			<button type="submit" class="btn btn-primary">Connexion</button>
		</form>
	</div>
	`
	if (!addScript("/js/2fa.js"))
		load2faLogin()
	tradNewPage()
}

pages["/2fa"].funct = aff2fa
aff2fa()
