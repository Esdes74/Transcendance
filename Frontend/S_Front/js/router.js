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

async function addScript(src, callback)
{
	if (scriptAlreadyLoaded(src))
	{
		callback()
		return (false)
	}
	let scriptElement = document.createElement('script')
	scriptElement.setAttribute("src", src)
	scriptElement.onload = await function() { callback() } 
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
		"/tournament": {
			script: "/js/aff_tournament.js",
			callback: "affTournament"
		},	
		"/tournament_bracket": {
			script: "js/aff_tournament_bracket.js",
			callback: "affTournamentBracket_start"
		},
		"/ai": {
			script: "/js/aff_ai.js",
			callback: "affAI"
		},
		"/404": {
			script: "/js/aff_404.js",
			callback: "aff404"
		},
		"/50X": {
			script: "/js/aff_50X.js",
			callback: "aff50X"
		},
		"/registertoft": {
			script: "/js/aff_registertoft.js",
			callback: "affRegisterToFT"
		},
		"/bravocallback": {
			script: "/js/aff_bravoCallBack.js",
			callback: "affBravoCallBack"
		},
		"/settings": {
			script: "/js/aff_settings.js",
			callback: "affSettings"
		}
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
		history.replaceState({pageID: '404'}, '', "/404")
		rootMyUrl()
	}
}

async function initiatePage()
{
	var path = window.location.pathname
	var queryParams = window.location.search
	var completeValue = path + queryParams
	history.replaceState({pageID: completeValue.substring(1)}, '', completeValue)
	window.addEventListener('popstate', function (event)
	{
		cleanTooltips()
		rootMyUrl()
	}
	)
	rootMyUrl()
	getLinks()
	if (await is_logged())
	{
		await changeHeader()
	}
	document.body.style.display = 'block';
}

async function is_logged()
{
	try {
		const response = await fetch('/api/auth/is_logged/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		});
		if (response.ok) {
			let jsonResponse = await response.json()
			console.log(jsonResponse)
			return (jsonResponse['detail'] !== "Not connected")
		}
		else {
			return false
		}
	} catch (error) {
		return false
	}
}

async function changeHeader()
{
	buttonToChange = document.getElementById("login-settings")
	buttonToChange.value = "settings"
	buttonToChange.innerText = "Paramètres"
	try {
		const response = await fetch('/api/auth/get_lang/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		})
		if (response.ok) {
			let jsonResponse = await response.json()
			lang = jsonResponse['message']
			if (lang === "an")
			{
				flag = document.querySelector('img[data-language="english"]')
				await updateLanguage(flag)
			}
			if (lang === "fr")
			{
				flag = document.querySelector('img[data-language="french"]')
				await updateLanguage(flag)
			}
			if (lang === "es")
			{
				flag = document.querySelector('img[data-language="spanish"]')
				await updateLanguage(flag)
			}
		}
		else {
			updatePage("50X")
		}
	} catch (error) {
		updatePage("50X")
	}
}

function logoutHeader()
{
	buttonToChange = document.getElementById("login-settings")
	buttonToChange.value = "authentification"
	buttonToChange.innerText = "Se connecter"
}

initiatePage()
