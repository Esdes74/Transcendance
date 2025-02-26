async function changeSecu(value)
{
	try {
		const data = {
			new2fa: value,
		}
		const response = await fetch('/api/auth/choose_verif/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include'
		})
		if (response.ok) {
			return (true)
		}
		else if (response.status >= 500 && response.status < 600)
		{
			updatePage("50X")
			return (false)
		}
		else {
			history.replaceState({pageID: 'denied'}, '', "denied")
			logoutHeader()
			rootMyUrl(false)
			return (false)
		}
	}
	catch (error) {
		updatePage("50X")
		return (false)
	}
}

async function changeFavLanguage(value)
{
	try {
		data = {
			newLang: value,
		}
		const response = await fetch('/api/auth/choose_lang/', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include'
		})
		if (response.ok) {
			let jsonResponse = await response.json()
			return (true)
		}
		else if (response.status >= 500 && response.status < 600)
		{
			updatePage("50X")
			return (false)
		}
		else {
			history.replaceState({pageID: 'denied'}, '', "denied")
			logoutHeader()
			rootMyUrl(false)
			return (false)
		}
	}
	catch (error) {
		updatePage("50X")
		return (false)
	}
}

async function sendDatas(settings)
{
	buttonDisabled = document.getElementById("save-change")
	buttonDisabled.disabled = true
	newSecu = document.getElementById("flexSwitchCheckDefault").checked
	const myMessage = document.getElementById('validation-message')
	if (settings["twofa"] !== newSecu)
	{
		await (changeSecu(newSecu))
		settings["twofa"] = newSecu
	}
	const radios = document.querySelectorAll('input[type="radio"]');
	let newLang
	radios.forEach( radio => {
		if (radio.checked)
			newLang = radio.id
	})
	if (settings["language"] !== newLang)
	{
		if (await (changeFavLanguage(newLang)))
			await getFlagAndUpdate(newLang)
		settings["language"] = newLang
	}
	else
		await getFlagAndUpdate(newLang)
	await affValidationMessage(myMessage)
	buttonDisabled.disabled = false
}

async function getFlagAndUpdate(newLang)
{
	if (newLang === "fr")
	{
		flag = document.querySelector('img[data-language="french"]')
		await updateLanguage(flag)
	}
	if (newLang === "an")
	{
		flag = document.querySelector('img[data-language="english"]')
		await updateLanguage(flag)
	}
	if (newLang === "es")
	{
		flag = document.querySelector('img[data-language="spanish"]')
		await updateLanguage(flag)
	}
}

async function initSettings()
{
	let settings = {}
	try {
		const response = await fetch('/api/auth/get_me/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include'
		})
		if (response.ok) {
			let jsonResponse = await response.json()
			settings["twofa"] = jsonResponse["secu"]
			settings["language"] = jsonResponse["language"]
		}
		else if (response.status >= 500 && response.status < 600)
		{
			updatePage("50X")
			return
		}
		else {
			history.replaceState({pageID: 'denied'}, '', "denied")
			logoutHeader()
			rootMyUrl(false)
			return
		}
	}
	catch (error) {
		updatePage("50X")
		return
	}
	if (!settings["twofa"])
		document.getElementById("flexSwitchCheckDefault").checked = false
	if (settings["language"] === "fr")
		document.getElementById("fr").checked = true
	else if (settings["language"] === "an")
		document.getElementById("an").checked = true
	else
		document.getElementById("es").checked = true
	document.getElementById("save-change").addEventListener("click", () => sendDatas(settings))
}

async function affValidationMessage(myMessage)
{
	myMessage.innerText = "Sauvegarde Effectuée !"
	tradElements([myMessage])
	myMessage.style.padding = '4px'
	await new Promise (r => setTimeout(r, 3000))
	myMessage.innerText = ""
	myMessage.style.padding = '0px'
}
