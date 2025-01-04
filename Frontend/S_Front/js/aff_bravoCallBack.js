function findname()
{
	loadBravoCallBack()
}

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
	addScript("/js/bravoCallBack.js", findname)
	tradNewPage()
}

//pages["/bravocallback"].funct = affBravoCallBack
//affBravoCallBack()
