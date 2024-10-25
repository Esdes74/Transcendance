function affBravo()
{
    let newBody = document.createElement('body')
    document.title = "Bravo"
    newBody.innerHTML = `
     <header>
        <h1>BRAVO</h1>
    </header>

    <main>
        <section>
            <h3>C'est une réussite</h3>
            <p>Bravo tu as réussit a te connecter</p>
            <p>maintenant c'est finis pour cette techno</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2024 Mon Site. Tous droits réservés.</p>
    </footer>
    `
    document.body = newBody
}