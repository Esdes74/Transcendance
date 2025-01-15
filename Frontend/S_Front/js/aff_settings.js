async function logoutUser()
{
	try {
		const response = await fetch('/api/auth/logout/', {
			method: 'POST'
		}) 
		if (response.ok) {
			logoutHeader()
			updatePage("")
		}
		else
			updatePage("50X")
	} catch (error) {
			updatePage("50X")
		}
}

async function changeSecu(value)
{
	try {
                const data = {
                        new2fa: value,
                }
                const response = await fetch('/api/auth/choose_verif/', {
                        method: 'POST',
                        headers: {
                                'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                        credentials: 'include'
                })
                if (response.ok) {
                        let jsonResponse = await response.json()
                        console.log(jsonResponse)
                }
                else
                        updatePage("50X")
        }
        catch (error) {
        	updatePage("50X")
        }
}

async function changeFavLanguage(value)
{
	try {
		data = {
			newLang: value,
		}
		const response = await fetch('/api/auth/choose_lang/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
			credentials: 'include'
		})
		if (response.ok) {
			let jsonResponse = await response.json()
			console.log(jsonResponse)
		}
		else
			updatePage("50X")
	}
	catch (error) {
		updatePage("50X")
	}
}

async function sendDatas(oldSecu, oldLang)
{
	newSecu = document.getElementById("flexSwitchCheckDefault").checked
	if (oldSecu !== newSecu)
		await (changeSecu(newSecu))
	const radios = document.querySelectorAll('input[type="radio"]');
	let newLang
	radios.forEach( radio => {
		if (radio.checked)
			newLang = radio.id
	})
	if (oldLang !== newLang)
		await (changeFavLanguage(newLang))
}

function callbackSettings()
{
    indexCanvas = document.getElementById("indexCanvas")
    initAnimationSettings(indexCanvas)
}

async function affSettings()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-5 fw-bold"><span data-translate="true">Paramètres Utilisateur</span><span id="username"></span></h1>
				<div class="canvas-container">
					<canvas id="indexCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<div class="form-check form-switch px-0 mb-3">
							<label class="form-check-label fw-bold fs-5" for="flexSwitchCheckDefault">Double Authentification</label>
							<input class="form-check-input mx-1" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked></input>
						</div>
						<hr/>
						<div class="fw-bold fs-5 mb-2"> Langue de Preference</div>
						<div class="row">
						<div class="col-4 d-flex flex-column justify-content-center align-items-center"> 
							<img class="border border-2 rounded" draggable=false style="width: 42px; height: 30px" src="/png/french_flag.png"></img>
							<div class="form-check d-flex justify-content-center">
							<input class="form-check-input" type="radio" name="flexRadioDefault" id="fr">
							</div>
						</div>
						<div class="col-4 d-flex flex-column justify-content-center align-items-center"> 
							<img class="border border-2 rounded" draggable=false style="width: 42px; height: 30px" src="/png/english_flag.png"></img>
							<div class="form-check d-flex justify-content-center">
							<input class="form-check-input" type="radio" name="flexRadioDefault" id="an">
							</div>
						</div>
						<div class="col-4 d-flex flex-column justify-content-center align-items-center"> 
							<img class="border border-2 rounded" draggable=false style="width: 42px; height: 30px" src="/png/spanish_flag.png"></img>	
							<div class="form-check d-flex justify-content-center">
						  	<input class="form-check-input" type="radio" name="flexRadioDefault" id="es">
							</div>
						</div>
						</div>
						<hr/>
						<button class="btn btn-outline-light fw-bold fs-6 mt-2 mb-3" id="save-change" data-translate="true">Sauvegarder les Changements</button>	
						<p class="mt-1 mb-0" id="logout"><span class="logout-btn fs-6 fw-bold text-white px-2 py-1 border border-2 rounded bg-danger data-translate="true"> Se Deconnecter </span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
	if (!await is_logged())
		updatePage("50X")
	let twofa
	let language
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
			console.log(jsonResponse)
			twofa = jsonResponse["secu"]
			language = jsonResponse["language"]
		}
		else
			console.log("error1")
	}
	catch (error) {
		console.log("error2")
	}
	if (!twofa)
		document.getElementById("flexSwitchCheckDefault").checked = false
	if (language === "fr")
		document.getElementById("fr").checked = true
	else if (language === "an")
		document.getElementById("an").checked = true
	else
		document.getElementById("es").checked = true
	document.getElementById("save-change").addEventListener("click", () => sendDatas(twofa, language))
	document.querySelectorAll('.replayBlock')[0].style.display = "block"
	document.getElementById('logout').addEventListener("click", () => logoutUser())
	await addScript("/js/settingsPong.js", callbackSettings)
	tradNewPage()
}
