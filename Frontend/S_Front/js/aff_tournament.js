function affTournament()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
	<h1>Organisation de Tournoi</h1>
	<div class="buttons">
    	<button onclick="generateFields(3)">Tournoi x3</button>
    	<button onclick="generateFields(4)">Tournoi x4</button>
    	<button onclick="generateFields(8)">Tournoi x8</button>
	</div>
	<div class="inputs" id="inputs"></div>
	</div>
	`
}

function generateFields(numberOfParticipants) {
	// Sélection de la div où afficher les champs
	const inputsContainer = document.getElementById('inputs');

	// Réinitialiser le contenu de la div
	inputsContainer.innerHTML = '';

	// Générer les champs d'entrée pour le nombre de participants
	for (let i = 1; i <= numberOfParticipants; i++) {
		const input = document.createElement('input');
		input.type = 'text';
		input.placeholder = `Pseudo du participant ${i}`;
		input.name = `participant_${i}`;
		inputsContainer.appendChild(input);
	}
}
pages["/tournament"].funct = affTournament
affTournament()
