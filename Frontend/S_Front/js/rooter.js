function scriptAlreadyLoaded(url)
{
	url = "https://localhost:3000/" + url
	let scripts = document.getElementsByTagName('script')
	for (let i = scripts.length; i--;)
	{
		if (scripts[i].src === url) 
			return true
	}
	return false
}

function addScript(src)
{
	if (scriptAlreadyLoaded(src))
		return (false)
	let scriptElement = document.createElement('script')
	scriptElement.setAttribute("src", src)
	document.body.appendChild(scriptElement)
	return (true)
}

function rootMyUrl()
{
    loc = window.location.pathname
    if (loc === "/index.html" || loc === "/index" || loc === "/")
    {
        document.title = "Index"
	if (!addScript("js/aff_index.js"))
		affIndex()
    }
    else if (loc === "/bravo.html" || loc === "/bravo")
    {
        document.title = "Bravo"
        if (!addScript("js/aff_bravo.js"))
		affBravo()
    }
    else if (loc === "/authentification.html" || loc === "/authentification")
    {
        document.title = "Authentification"
    	if (!addScript("js/aff_authentification.js"))
		affAuthentification()
    }
    else if (loc === "/register.html" || loc === "/register")
    {
        document.title = "Enregistrement"
    	if (!addScript("js/aff_register.js"))
		affRegister()
    }
    else if (loc === "/pong.html" || loc === "/pong")
    {
        document.title = "Pong de ZINZIN"
        if (!addScript("js/aff_pong.js"))
		affPong()
    }
}

rootMyUrl()
getLinks()
window.addEventListener('popstate', function (event)
{
    rootMyUrl()
}
)
