function bravoFct()
{
	loadBravoCallBack()
}

function affBravoCallBack()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	`
	addScript("/js/bravoCallBack.js", bravoFct)
	tradNewPage()
}
