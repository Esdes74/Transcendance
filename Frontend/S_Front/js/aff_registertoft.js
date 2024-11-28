function affRegisterToFT()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<div class="container mt-5">
		<h1>Please wait until redirect to 42 connection</h1>
	</div>
	`
	if (!addScript("/js/registertoft.js"))
		loadRegisterToFT()
	tradNewPage()
}

pages["/registertoft"].funct = affRegisterToFT
affRegisterToFT()