function tradElements()
{
	let currentFlag = document.getElementById("currentFlag")
	let elements = document.querySelectorAll('[data-translate="true"]')
	if (currentFlag.getAttribute('data-language') === "spanish")
	elements.forEach( element => {
                element.innerText = "paella"
        })
	if (currentFlag.getAttribute('data-language') === "english")
	elements.forEach( element => {
		element.innerText = "fish and chips"
	})
	if (currentFlag.getAttribute('data-language') === "french")
	elements.forE
}


function updateLanguage(flag)
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

	tradElements()
}

function getFlags()
{
	let flags = document.querySelectorAll('img[type="flag"]')
	flags.forEach( flag => {
		flag.addEventListener("click", () => updateLanguage(flag))
	})
}

getFlags() 
