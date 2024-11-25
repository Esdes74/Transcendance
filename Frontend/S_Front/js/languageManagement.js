function updateLanguage(flag)
{
	let currentFlag = document.getElementById("currentFlag")
	if (flag.getAttribute('value') === currentFlag.getAttribute('value'))
		return
	else
	{
		let tmpAlt = flag.alt
		let tmpValue = flag.getAttribute('value')
		let tmpSrc = flag.src

		flag.src = currentFlag.src
		flag.alt = currentFlag.alt
		flag.setAttribute('value', currentFlag.getAttribute('value'))

		currentFlag.alt = tmpAlt
		currentFlag.src = tmpSrc
		currentFlag.setAttribute('value', tmpValue)
	}
}

function getFlags()
{
	let flags = document.querySelectorAll('img[type="flag"]')
	console.log(flags)
	flags.forEach( flag => {
		flag.addEventListener("click", () => updateLanguage(flag))
	})
}

getFlags() 
