function updatePage(value)
{
    if (value === "index")
	value = ""
    if (history.state && (value === history.state.pageID || value === "expand"))
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
