function onPushState()
{
    console.log("event dispatched");
    const event = new CustomEvent('pageChanged');
    document.dispatchEvent(event);
}

function getMainButtons()
{
	let buttons = document.querySelectorAll('main button')
	buttons.forEach( button => {
		button.addEventListener("click", () => updatePage(button.value))
		console.log("button : ", button.value)
	})
}

function cleanTooltips()
{
    let tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach( tooltip => {
	tooltip.remove()})
}

async function updatePage(value)
{
	if (value === "index")
	value = ""
	if (value === history.state.pageID || value === "expand")
		return
	cleanTooltips()
	history.pushState({pageID: value}, '', "/" + value)
	const event = new CustomEvent('pageChanged');
	document.dispatchEvent(event);
	if (await is_logged())
		rootMyUrl(true)
	else
		rootMyUrl(false)
}

function getLinks()
{
	let buttons = document.querySelectorAll("button")
	buttons.forEach( button => {
		button.addEventListener("click", () => updatePage(button.value))
	})
}
