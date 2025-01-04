function scriptAlreadyLoaded(url)
{
	url = "https://" + window.location.host + url
	let scripts = document.getElementsByTagName('script')
	for (let i = scripts.length; i--;)
	{
		if (scripts[i].src === url) 
		{
			return true
		}
	}
	return false
}

function addScript(src, callback)
{
	if (scriptAlreadyLoaded(src))
	{
		callback()
		return (false)
	}
	let scriptElement = document.createElement('script')
	scriptElement.setAttribute("src", src)
	scriptElement.onload = function() { callback() } 
	document.body.appendChild(scriptElement)
	return (true)
}

function rootMyUrl()
{
    let pages = {
	"/": {
		title: "Welcome",
		script: "/js/aff_index.js",
		callback: "affIndex"
	},
	"/bravo": {
		title: "Bravo!",
		script: "/js/aff_bravo.js",
		callback: "affBravo"
	},
	"/authentification": {
		title: "Authentification",
		script: "/js/aff_authentification.js",
		callback: "affAuthentification"
	},
	"/register": {
		title: "Register",
		script: "/js/aff_register.js",
		callback: "affRegister"
	},
	"/pong": {
		title: "Crazy Pong",
		script: "/js/aff_pong.js",
		callback: "affPong"
	},
	"/2fa": {
		title: "2fa",
		script: "/js/aff_2fa.js",
		callback: "aff2fa"
	},
	"/play": {
		title: "play",
		script: "/js/aff_play.js",
		callback: "affPlay"
	},
	"/tournament": {
		title: "tournament",
		script: "/js/aff_tournament.js",
		callback: "affTournament"
	},
	"/ai": {
		title: "AI Pong",
		script: "/js/aff_ai.js",
		callback: "affAI"
	},
	// "/matchmaking": {
	// 	title: "matchmaking",
	// 	script: "js/tournament.js",
	// 	callback: null
	// },	--> peut etre ?
	"/404": {
		title: "Error 404",
		script: "/js/aff_404.js",
		callback: "aff404"
	},
	"/registertoft": {
		title: "Remote Authentification",
		script: "/js/aff_registertoft.js",
		callback: "affRegisterToFT"
	},
	"/bravocallback": {
		title: "Bravo Callback",
		script: "/js/aff_bravoCallBack.js",
		callback: "affBravoCallBack"
	},
    }


    let loc = window.location.pathname;
    if (pages[loc])
    {
	let page = pages[loc];
	if (scriptAlreadyLoaded(page.script))
        {
                window[page.callback]()
                return (false)
        }
        let scriptElement = document.createElement('script')
	scriptElement.setAttribute("src", page.script)
	scriptElement.onload = function() {
		window[page.callback]()
	}
        document.body.appendChild(scriptElement)
        return (true)
    }
    else
    {
		console.log(loc)
		history.pushState({pageID: '404'}, '', "/404")
		rootMyUrl()
    }
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
