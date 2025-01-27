function callbackSettingsPong()
{
	settingsCanvas = document.getElementById("settingsCanvas")	
	initAnimationSettings(settingsCanvas)
}

function callbackSettings()
{
	initSettings()
}

async function affSettings()
{
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
		<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-5 fw-bold"><span data-translate="true">Paramètres Utilisateur</span></h1>
				<div class="canvas-container">
					<canvas id="settingsCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<div class="form-check form-switch px-0 mb-3" data-bs-toggle="tooltip" data-bs-trigger="hover" data-bs-placement="right" data-translate="tooltips" data-bs-original-title="Aucun effet sur l'authentification 42">
							<label class="form-check-label fw-bold fs-5" data-translate="true" for="flexSwitchCheckDefault">Double Authentification</label>
							<input class="form-check-input mx-1" type="checkbox" role="switch" id="flexSwitchCheckDefault" checked></input>
						</div>
						<hr/>
						<div class="fw-bold fs-5 mb-2" data-translate="true"> Langue de Préférence</div>
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
						<button class="btn btn-outline-light fw-bold fs-6 mt-2 mb-2" id="save-change" data-translate="true">Sauvegarder les Changements</button>	
						<p class="my-0 py-1"><span class="bg-success text-white rounded fw-bold fs-6" id="validation-message" data-translate="true"></span></p>
						<p class="mt-1 mb-2" id="logout"><span class="logout-btn fs-6 fw-bold text-white px-2 py-1 border border-2 rounded bg-danger" data-translate="true"> Se Déconnecter </span></p>
						<p class="del-btn mb-0" id="deleteAccount"><span class="del-btn fs-6 fw-bold text-white px-2 py-1 border border-2 rounded bg-dark" data-translate="true">Supprimer son compte</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    `
	tooltip = document.querySelector('[data-bs-toggle="tooltip"]')
	new bootstrap.Tooltip(tooltip)
	document.querySelectorAll('.replayBlock')[0].style.display = "block"
	document.getElementById('logout').addEventListener("click", () => logoutUser())
	document.getElementById('deleteAccount').addEventListener("click", () => deleteUser())
	addScript("/js/settings.js", callbackSettings)
	addScript("/js/settingsPong.js", callbackSettingsPong)
	tradNewPage()
}
