function affRegister()
{
    let newBody = document.createElement('body')
    document.title = "Login"
    newBody.innerHTML = `
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
            <div class="form-group">
                <label for="confirmed-password">Confirmation mot de passe</label>
                <input type="password" class="form-control" id="confirmed-password" placeholder="Confirmez votre mot de passe" required>
            </div>
            <div class="form-group">
                <label for="pseudo">Pseudo</label>
                <input type="text" class="form-control" id="pseudo" placeholder="Entrez votre pseudo" required>
            </div>
            <div class="form-group">
                <label for="mail">E-Mail</label>
                <input type="email" class="form-control" id="mail" placeholder="Entrez votre e-mail">
            </div>
            <div class="form-group">
                <label for="phone_nb">Phone number</label>
                <input type="tel" class="form-control" id="phone_nb" placeholder="Entrez votre numéros de téléphone">
            </div>
            <div class="form-group">
                <label for="address">Address</label>
                <input type="text" class="form-control" id="address" placeholder="Entrez votre addresse">
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <div id="error-message" class="mt-3 text-danger"></div>
    </div>

    <script src="js/register.js"></script>
    `
    document.body = newBody
}