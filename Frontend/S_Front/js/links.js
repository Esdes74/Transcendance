function updatePage(value)
{
    if (value === "index")
	value = ""
    if (value === history.state.pageID)
    	return
    history.pushState({pageID: value}, '', "/" + value)
    rootMyUrl()
}

function getLinks()
{
    let buttons = document.querySelectorAll("button")
    buttons.forEach( button => {
    	button.addEventListener("click", () => updatePage(button.value))
    })
}
