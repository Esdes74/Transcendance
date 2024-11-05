function affIndex()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
    <section>
        <h3>Introduction</h3>
        <p>Ceci est la page d'accueil de votre site. Utilisez cette section pour présenter les fonctionnalités principales.</p>
        <p>Vous pouvez ajouter du contenu supplémentaire ici, comme des images, des descriptions, etc.</p>
    </section>
    <section>
        <h2>Accéder à votre compte</h2>
        <input type="button" value="Connexion" />
    </section>
    `
}

affIndex()
