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
    })
}

function updatePage(value)
{
    if (value === "index")
	value = ""
    if (value === history.state.pageID || value === "expand")
    	return
    history.pushState({pageID: value}, '', "/" + value)
    console.log("event dispatched");
    const event = new CustomEvent('pageChanged');
    document.dispatchEvent(event);
    console.log(history.state)
    rootMyUrl()
}

function getLinks()
{
    let buttons = document.querySelectorAll("button")
    buttons.forEach( button => {
    	button.addEventListener("click", () => updatePage(button.value))
    })
}
