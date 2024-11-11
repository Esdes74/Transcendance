let pages = {
	"/": {
		title: "Welcome",
		script: "js/aff_index.js",
		funct: null
	},
	"/bravo": {
		title: "Bravo!",
		script: "js/aff_bravo.js",
		funct: null
	},
	"/authentification": {
		title: "Authentification",
		script: "js/aff_authentification.js",
		funct: null
	},
	"/register": {
		title: "Register",
		script: "js/aff_register.js",
		funct: null
	},
	"/pong": {
		title: "Crazy Pong",
		script: "js/aff_pong.js",
		funct: null
	},
	"/2fa": {
		title: "2fa",
		script: "js/aff_2fa.js",
		funct: null
	},
	"/play": {
		title: "play",
		script: "js/aff_play.js",
		funct: null
	},
	"/tournament": {
		title: "tournament",
		script: "js/aff_tournament.js",
		funct: null
	},
	"/online": {
		title: "Online Pong",
		script: "js/aff_online.js",
		funct: null
	}
}

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
    let loc = window.location.pathname;
    if (pages[loc])
    {
       let page = pages[loc];
       document.title = page.title;
       if (!addScript(page.script))
	page.funct();
    }
    else
      console.log("error 404");
}

var path = window.location.pathname
history.pushState({pageID: path.substring(1)}, '', path)
rootMyUrl()
getLinks()
document.body.style.display = 'block';
window.addEventListener('popstate', function (event)
{
    rootMyUrl()
}
)
