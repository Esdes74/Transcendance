function tradNewPage()
{	
	let flag = document.getElementById("currentFlag")
	if (currentFlag.getAttribute('data-language') !== "french")
	{
		let elements = document.querySelectorAll('[data-translate="true"]')
		tradElements(elements)
		let placeholders = document.querySelectorAll('[data-translate="placeholder"]')
		tradPlaceholders(placeholders)
		let tooltips = document.querySelectorAll('[data-translate="tooltips"]')
		tradTooltips(tooltips)
	}
}

function tradDiv(div)
{
	let flag = document.getElementById("currentFlag")
	if (currentFlag.getAttribute('data-language') !== "french")
	{
		let elements = div.querySelectorAll('[data-translate="true"]')
		tradElements(elements)
		let placeholders = div.querySelectorAll('[data-translate="placeholder"]')
		tradPlaceholders(placeholders)
		let tooltips = div.querySelectorAll('[data-translate="tooltips"]')
		tradTooltips(tooltips)
	}
}

async function getTrads(language)
{
	let request
	if (language === "spanish")
		request = new Request("/json/fr_sp_trad.json")
	if (language === "english")
		request = new Request("/json/fr_en_trad.json")
	try
	{
		let response = await fetch(request)
		if (!response.ok)
			return
		let trads = await response.json()
		return (trads)
	} catch (error) {
		return
	}
}

async function tradElements(elements)
{
	let currentFlag = document.getElementById("currentFlag")
	let language = currentFlag.getAttribute('data-language')
	if (language === "french")
		return
	let trads = await getTrads(language)
	if (typeof trads === 'undefined')
		return
	elements.forEach( element => {
		if (element.innerText in trads)
                	element.innerText = trads[element.innerText]
	})
}

async function tradPlaceholders(elements)
{
	let currentFlag = document.getElementById("currentFlag")
	let language = currentFlag.getAttribute('data-language')
	if (language === "french")
		return
	let trads = await getTrads(language)
	if (typeof trads === 'undefined')
                return
	elements.forEach( element => {
		if (element.placeholder in trads)
                	element.placeholder = trads[element.placeholder]
	})
}

async function tradTooltips(elements)
{
	let currentFlag = document.getElementById("currentFlag")
	let language = currentFlag.getAttribute('data-language')
	if (language === "french")
		return
	let trads = await getTrads(language)
	if (typeof trads === 'undefined')
                return
	elements.forEach( element => {
		title = element.getAttribute('data-bs-original-title')
		if (title in trads)
			element.setAttribute('data-bs-original-title', trads[title])
	})
}

async function returnToFrench(language)
{
	let trads = await getTrads(language)
	if (typeof trads === 'undefined')
                return
	let invertedTrads = {};
	for (let key in trads)
		invertedTrads[trads[key]] = key;
	let elements = document.querySelectorAll('[data-translate="true"]')
	elements.forEach( element => {
		if (element.innerText in invertedTrads)
			element.innerText = invertedTrads[element.innerText]
	})
	let placeholders = document.querySelectorAll('[data-translate="placeholder"]')
	placeholders.forEach( element => {
		if (element.placeholder in invertedTrads)
			element.placeholder = invertedTrads[element.placeholder]
	})
	let tooltips = document.querySelectorAll('[data-translate="tooltips"]')
	tooltips.forEach( element => {
		title = element.getAttribute('data-bs-original-title')
		if (title in invertedTrads)
			element.setAttribute('data-bs-original-title', invertedTrads[title])
		})
}

async function updateLanguage(clickedFlag)
{
	let currentFlag = document.getElementById("currentFlag")
	if (clickedFlag.getAttribute('data-language') === currentFlag.getAttribute('data-language'))
		return
	let tmpAlt = clickedFlag.alt
	let tmpValue = clickedFlag.getAttribute('data-language')
	let tmpSrc = clickedFlag.src

	clickedFlag.src = currentFlag.src
	clickedFlag.alt = currentFlag.alt
	clickedFlag.setAttribute('data-language', currentFlag.getAttribute('data-language'))

	currentFlag.alt = tmpAlt
	currentFlag.src = tmpSrc
	currentFlag.setAttribute('data-language', tmpValue)

	if (clickedFlag.getAttribute('data-language') !== "french")
		await returnToFrench(clickedFlag.getAttribute('data-language'))
	
	let elements = document.querySelectorAll('[data-translate="true"]')
	tradElements(elements)
	let placeholders = document.querySelectorAll('[data-translate="placeholder"]')
	tradPlaceholders(placeholders)
	let tooltips = document.querySelectorAll('[data-translate="tooltips"]')
	tradTooltips(tooltips)
}

function getFlags()
{
	let flags = document.querySelectorAll('img[type="flag"]')
	flags.forEach( flag => {
		flag.addEventListener("click", () => updateLanguage(flag))
	})
}

getFlags()
