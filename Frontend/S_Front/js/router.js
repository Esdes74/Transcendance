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

function getLinks()
{
	let buttons = document.querySelectorAll("button")
	buttons.forEach( button => {
		button.addEventListener("click", () => updatePage(button.value))
	})
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

function cleanTooltips()
{
    let tooltips = document.querySelectorAll('.tooltip')
    tooltips.forEach( tooltip => {
	tooltip.remove()})
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

function rootMyUrl(isLogged)
{
	let pages = {
		"/": {
			script: "/js/aff_index.js",
			callback: "affIndex",
			logged: "no condition",
		},
		"/denied": {
			script: "/js/aff_denied.js",
			callback: "affDenied",
			logged: "no condition",
		},
		"/duplicate": {
			script: "/js/aff_duplicate.js",
			callback: "affDuplicate",
			logged: "must",
		},
		"/authentification": {
			script: "/js/aff_authentification.js",
			callback: "affAuthentification",
			logged: "must not",
		},
		"/register": {
			script: "/js/aff_register.js",
			callback: "affRegister",
			logged: "must not",
		},
		"/pong": {
			script: "/js/aff_pong.js",
			callback: "affPong",
			logged: "no condition",
		},
		"/2fa": {
			script: "/js/aff_2fa.js",
			callback: "aff2fa",
			logged: "must not",
		},
		"/tournament": {
			script: "/js/aff_tournament.js",
			callback: "affTournament",
			logged: "must",
		},
		"/ai": {
			script: "/js/aff_ai.js",
			callback: "affAI",
			logged: "no condition",
		},
		"/404": {
			script: "/js/aff_404.js",
			callback: "aff404",
			logged: "no condition",
		},
		"/50X": {
			script: "/js/aff_50X.js",
			callback: "aff50X",
			logged: "no condition",
		},
		"/registertoft": {
			script: "/js/aff_registertoft.js",
			callback: "affRegisterToFT",
			logged: "must not",
		},
		"/bravocallback": {
			script: "/js/aff_bravoCallBack.js",
			callback: "affBravoCallBack",
			logged: "must not",
		},
		"/settings": {
			script: "/js/aff_settings.js",
			callback: "affSettings",
			logged: "must",
		},
	}
	let loc = window.location.pathname;
	if (pages[loc])
	{
		let page = pages[loc];
		if (page.logged === "must" && !isLogged)
		{
			history.replaceState({pageID: 'denied'}, '', "/denied")
			rootMyUrl(isLogged)
			return (false)
		}
		if (page.logged === "must not" && isLogged)
		{
			history.replaceState({pageID: 'duplicate'}, '', "/duplicate")
			rootMyUrl(isLogged)
			return (false)
		}
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
		rootMyUrl(isLogged)
	}
}

async function initiatePage()
{
	var path = window.location.pathname
	var queryParams = window.location.search
	var completeValue = path + queryParams
	history.replaceState({pageID: completeValue.substring(1)}, '', completeValue)
	window.addEventListener('popstate', async function (event)
	{
	
		cleanTooltips()
		if (await is_logged())
			rootMyUrl(true)
		else
			rootMyUrl(false)
	})
	if (await is_logged())
		rootMyUrl(true)
	else
		rootMyUrl(false)
	getLinks()
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
			if (jsonResponse['detail'] === "Not connected")
			{
				logoutHeader()
				return false
			}
			changeHeader()
			return true
		}
		else {
			logoutHeader()
			return false
		}
	} catch (error) {
		changeHeader()
		return false
	}
}

async function changeHeader()
{
	buttonToChange = document.getElementById("login-settings")
	if (buttonToChange.value === "settings")
		return
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

async function logoutUser()
{
	try {
		const response = await fetch('/api/auth/logout/', {
			method: 'POST'
		})
		if (response.ok)
			updatePage("")
		else
			updatePage("50X")
	} catch (error) {
		updatePage("50X")
	}
}

initiatePage()
