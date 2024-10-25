function affIndex()
{
    let newBody = document.createElement('body')
    let scriptElement = document.createElement('script')
    scriptElement.setAttribute("src", "indexLinks.js")
    document.head.appendChild(scriptElement)
    document.title = "Accueil"
    newBody.innerHTML = `
    <header>
        <h1>Bienvenue sur Mon Site</h1>
        <nav>
            <ul>
                <li><input type="button" value="Accueil" />
                <li><input type="button" value="Play" />
                <li><input type="button" value="Connexion" />
                <li><input type="button" value="A Propos" />
            </ul>
        </nav>
    </header>

    <main>
        <section>
            <h3>Introduction</h3>
            <p>Ceci est la page d'accueil de votre site. Utilisez cette section pour présenter les fonctionnalités principales.</p>
            <p>Vous pouvez ajouter du contenu supplémentaire ici, comme des images, des descriptions, etc.</p>
        </section>
        <section>
            <h2>Accéder à votre compte</h2>
            <input type="button" value="Connexion" />
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Mon Site. Tous droits réservés.</p>
    </footer>
    `
    document.body = newBody
    scriptElement.onload = function()
    {
        getLinks()
    }
}