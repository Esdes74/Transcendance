function affBravoCallBack()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
    <section>
        <h3>C'est une réussite</h3>
        <p>Bravo tu as réussit a te connecter</p>
        <p>maintenant c'est finis pour cette techno</p>
    </section>
    `
	if (!addScript("/js/bravoCallBack.js"))
		loadBravoCallBack()
    tradNewPage()
}

// pages["/bravocallback"].funct = affBravoCallBack
affBravoCallBack()
