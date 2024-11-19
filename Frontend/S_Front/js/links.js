const originalPushState = history.pushState;    

function onPushState()
{
    const event = new CustomEvent('pageChanged');
    document.dispatchEvent(event);
    console.log("event dispatched");
}

history.pushState = function (...args)
{
    onPushState();
    originalPushState.apply(this, args);
}

function updatePage(value)
{
    if (value === "index")
	value = ""
    if (value === history.state.pageID || value === "expand")
    	return
    history.pushState({pageID: value}, '', "/" + value)
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
