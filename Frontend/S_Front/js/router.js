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
		script: "/js/aff_index.js",
		callback: "affIndex"
	},
	"/bravo": {
		script: "/js/aff_bravo.js",
		callback: "affBravo"
	},
	"/authentification": {
		script: "/js/aff_authentification.js",
		callback: "affAuthentification"
	},
	"/register": {
		script: "/js/aff_register.js",
		callback: "affRegister"
	},
	"/pong": {
		script: "/js/aff_pong.js",
		callback: "affPong"
	},
	"/2fa": {
		script: "/js/aff_2fa.js",
		callback: "aff2fa"
	},
	"/play": {
		script: "/js/aff_play.js",
		callback: "affPlay"
	},
	"/tournament": {
		script: "/js/aff_tournament.js",
		callback: "affTournament"
	},
	"/ai": {
		script: "/js/aff_ai.js",
		callback: "affAI"
	},
	// "/matchmaking": {
	// 	title: "matchmaking",
	// 	script: "js/tournament.js",
	// 	callback: null
	// },	--> peut etre ?
	"/404": {
		script: "/js/aff_404.js",
		callback: "aff404"
	},
	"/registertoft": {
		script: "/js/aff_registertoft.js",
		callback: "affRegisterToFT"
	},
	"/bravocallback": {
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

function initiatePage()
{
	var path = window.location.pathname
	history.pushState({pageID: path.substring(1)}, '', path)
	if (is_logged())
	{
		change_header()
	}
	rootMyUrl()
	getLinks()
	document.body.style.display = 'block';
	window.addEventListener('popstate', function (event)
	{
		rootMyUrl()
	}
	)
}

async function is_logged()
{
	try {
		// Envoie les données à l'API
		const response = await fetch('/api/auth/is_logged/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		});

		// Vérifie la réponse de l'API
		if (response.ok) {
			return true
		} else {
			return false
		}
	} catch (error) {
		// console.error('Erreur cotee serveur', error);
		return false
	}
}

function change_header()
{

}

initiatePage()