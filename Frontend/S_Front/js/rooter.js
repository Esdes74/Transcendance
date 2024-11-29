let pages = {
	"/": {
		title: "Welcome",
		script: "/js/aff_index.js",
		funct: null
	},
	"/bravo": {
		title: "Bravo!",
		script: "/js/aff_bravo.js",
		funct: null
	},
	"/bravocallback": {
		title: "Bravo!callback",
		script: "/js/aff_bravoCallBack.js",
		funct: null
	},
	"/authentification": {
		title: "Authentification",
		script: "/js/aff_authentification.js",
		funct: null
	},
	"/register": {
		title: "Register",
		script: "/js/aff_register.js",
		funct: null
	},
	"/registertoft": {
		title: "RegisterToFT",
		script: "/js/aff_registertoft.js",
		funct: null
	},
	"/pong": {
		title: "Crazy Pong",
		script: "/js/aff_pong.js",
		funct: null
	},
	"/2fa": {
		title: "2fa",
		script: "/js/aff_2fa.js",
		funct: null
	},
	"/play": {
		title: "play",
		script: "/js/aff_play.js",
		funct: null
	},
	"/tournament": {
		title: "tournament",
		script: "/js/aff_tournament.js",
		funct: null
	},
	"/online": {
		title: "Online Pong",
		script: "/js/aff_online.js",
		funct: null
	},
	"/404": {
		title: "Error 404",
		script: "/js/aff_404.js",
		funct: null
	}
}

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

function addScript(src)
{
	if (scriptAlreadyLoaded(src))
		return (false)
	let scriptElement = document.createElement('script')
	scriptElement.setAttribute("src", src)
	document.body.appendChild(scriptElement)
	return (true)
}

function handleApiRedirect() {
	let loc = window.location.pathname;
	const urlParams = new URLSearchParams(window.location.search);
	const apiCode = urlParams.get('code');  // Si l'API ajoute un code à l'URL

	if (apiCode) {
		// Traitement spécial pour l'URL avec le code d'API
		// Ajoutez ici la logique pour gérer le code d'API, par exemple :
		// envoyer ce code à votre backend ou rediriger ailleurs
		console.log("Code de l'API détecté :", apiCode);
		// Vous pouvez ici rediriger ou effectuer une action spéciale.
		return true;
	}
	return false;
}

function rootMyUrl() {
	let loc = window.location.pathname;

	if (handleApiRedirect()) {
		return;  // Si l'URL contient un code d'API, ne pas poursuivre avec le routage normal
	}

	if (pages[loc]) {
		let page = pages[loc];
		if (!addScript(page.script) && page.funct) {
			page.funct();
		}
	} else {
		history.pushState({ pageID: '404' }, '', "/404");
		rootMyUrl();
	}
}

// function rootMyUrl()
// {
// 	let loc = window.location.pathname;
// 	if (pages[loc])
// 	{
// 		let page = pages[loc];
// 		//document.title = page.title;
// 		if (!addScript(page.script) && page.funct)
// 		{
// 			page.funct();
// 		}
// 	}
// 	else
// 	{
// 	history.pushState({pageID: '404'}, '', "/404")
// 	rootMyUrl()
// 	}
// }

rootMyUrl()
getLinks()
document.body.style.display = 'block';
window.addEventListener('popstate', function (event)
{
	rootMyUrl()
}
)
