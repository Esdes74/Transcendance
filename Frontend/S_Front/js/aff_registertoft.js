function affRegisterToFT()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<div class="container mt-5">
		<h1>Connexion</h1>
		<h2>Test</h2>
	</div>
	`
	if (!addScript("/js/registertoft.js"))
		loadRegisterToFT()
	tradNewPage()
}

pages["/registertoft"].funct = affRegisterToFT
affRegisterToFT()