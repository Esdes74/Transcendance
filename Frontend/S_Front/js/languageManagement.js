async function tradElements(elements)
{
	let currentFlag = document.getElementById("currentFlag")
	let language = currentFlag.getAttribute('data-language')
	if (language === "french")
		return
	
	let request;
	if (language === "spanish")
		request = new Request("/json/fr_sp_trad.json")
	if (language === "english")
		request = new Request("/json/fr_en_trad.json")
	let response = await fetch(request)
	if (!response.ok)
		console.error("Erreur:", response.status)
	let trads = await response.json()
	
	elements.forEach( element => {
                element.innerText = trads[element.innerText]
	})
}

async function returnToFrench(language)
{
	let request;
	if (language === "english")
		request = new Request("/json/fr_en_trad.json")
	if (language === "spanish")
		request = new Request("/json/fr_sp_trad.json")
	let response = await fetch(request)
	let trads = await response.json()
	
	let invertedTrads = {};
	for (let key in trads)
		invertedTrads[trads[key]] = key;
	let elements = document.querySelectorAll('[data-translate="true"]')
	elements.forEach( element => {
		element.innerText = invertedTrads[element.innerText]
	})
}

async function updateLanguage(flag)
{
	let currentFlag = document.getElementById("currentFlag")
	if (flag.getAttribute('data-language') === currentFlag.getAttribute('data-language'))
		return
	let tmpAlt = flag.alt
	let tmpValue = flag.getAttribute('data-language')
	let tmpSrc = flag.src

	flag.src = currentFlag.src
	flag.alt = currentFlag.alt
	flag.setAttribute('data-language', currentFlag.getAttribute('data-language'))

	currentFlag.alt = tmpAlt
	currentFlag.src = tmpSrc
	currentFlag.setAttribute('data-language', tmpValue)

	if (flag.getAttribute('data-language') !== "french")
		await returnToFrench(flag.getAttribute('data-language'))
	let elements = document.querySelectorAll('[data-translate="true"]')
	tradElements(elements)
}

function getFlags()
{
	let flags = document.querySelectorAll('img[type="flag"]')
	flags.forEach( flag => {
		flag.addEventListener("click", () => updateLanguage(flag))
	})
}

getFlags() 
