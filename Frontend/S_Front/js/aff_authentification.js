function affAuthentification()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
    <div class="container mt-5">
		<h2>Connexion</h2>
		<form id="loginForm">
			<div class="form-group">
				<label for="username">Nom d'utilisateur</label>
				<input type="text" class="form-control" id="username" placeholder="Entrez votre nom d'utilisateur" required>
			</div>
			<div class="form-group">
				<label for="password">Mot de passe</label>
				<input type="password" class="form-control" id="password" placeholder="Entrez votre mot de passe" required>
			</div>
			<button type="submit" class="btn btn-primary">Connexion</button>
		</form>
		<div id="error-message" class="mt-3 text-danger"></div>
		<section>
			<h2>Creer votre compte</h2>
			<button type="button" class="btn btn-dark" value="Register"> Register</button>
		</section>
	</div>
    `
	if (!addScript("js/login.js"))
		loadLogin()
}

pages["/authentification"].funct = affAuthentification
affAuthentification()
