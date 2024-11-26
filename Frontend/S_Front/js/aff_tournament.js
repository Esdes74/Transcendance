function affTournament()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
	<h1>Organisation de Tournoi</h1>
	<div class="buttons">
    	<button onclick="selectTournament(3)">Tournoi x3</button>
   		<button onclick="selectTournament(4)">Tournoi x4</button>
    	<button onclick="selectTournament(8)">Tournoi x8</button>
    	<button onclick="lockParticipants(nameList)">valider</button>
	</div>
	<div class="inputs" id="inputs">
	</div>
	</div>
	`
}

let validatedNames = 0; // Compteur des noms validés
let currentFields = 0; // Nombre total de champs actuellement affichés
let nameList = [];

function selectTournament(numberOfParticipants, nameList) {
	const inputsContainer = document.getElementById('inputs');
	let socket;

	socket = new WebSocket('/ws/Tournament/');
	console.log("nameList");
	initSocket(socket);
	// Si trop de noms validés pour le nouveau tournoi, afficher un message d'erreur
	if (validatedNames > numberOfParticipants)
	{
		alert(
			`Impossible de passer à un tournoi avec ${numberOfParticipants} participants.
          Vous avez déjà validé ${validatedNames} noms. Supprimez des noms avant de changer.`
		);
		return;
	}

	// Gestion des champs existants
	const existingFields = Array.from(inputsContainer.children);

	// Supprimer les champs vides en excès si nécessaire
	if (numberOfParticipants < currentFields) {
		let fieldsToRemove = currentFields - numberOfParticipants;
		for (let i = existingFields.length - 1; i >= 0 && fieldsToRemove > 0; i--) {
			const field = existingFields[i];
			const input = field.querySelector('input');
			if (input && !input.value.trim()) {
				field.remove();
				fieldsToRemove--;
				currentFields--;
			}
		}
	}

	// Ajouter des nouveaux champs si nécessaire
	while (currentFields < numberOfParticipants)
	{
		const inputDiv = document.createElement('div');
		const input = createInputField(currentFields + 1);

		inputDiv.appendChild(input);
		inputsContainer.appendChild(inputDiv);
		currentFields++;
	}
}

function initSocket(socket) {
	/// Gestion de l'ouverture de la connexion WebSocket \\\

	socket.onopen = async function (e) {
		console.log("WebSocket is connected ouais");
	};
}
function createInputField(index) {
	const input = document.createElement('input');
	input.type = 'text';
	input.minLength = 4;
	input.minLength = 8;
	input.placeholder = `Pseudo du participant ${index}`;
	input.name = `participant_${index}`;
	input.dataset.index = index;
	input.className = 'input-field';  // Appliquer la classe CSS 'input-field'

	// Gestion de la validation par Entrée
	input.addEventListener('keydown', function (event) {
		if (event.key === 'Enter') {
			validateField(input);
		}
	});

	return input;
}

//TODO Message de reponse en fonction de ce que renvoi le back
function alert_message(name)
{
	let message;

	if (!name)
		message = 'un nom ne peut etre vide';
	else if (name.length > 8)
		message = 'merci de saisir un nom avec moins de 9 caracteres';
	else if (name.length < 4)
		message = 'merci de saisir un nom avec plus de 3 caracteres';
	else
		message = 'le nom a deja été saisi';
	alert(message);
}

function validateField(input) {
	const name = input.value.trim(); // Récupérer la valeur saisie
	//TODO verification qui doit etre passé dans le back
	if (!name || name.length < 4 || name.length > 8 || name === nameList.find(name => name === name))
	{
		alert_message(name);
	}
	else {
		validatedNames++; // Incrémenter le compteur de noms validés
		nameList.push(name);
		const nameContainer = document.createElement('div');
		nameContainer.className = 'name-container';

		const nameDiv = document.createElement('div');
		nameDiv.className = 'name';
		nameDiv.textContent = `Participant ${input.dataset.index} : ${name}`;

		const deleteBtn = document.createElement('button');
		deleteBtn.className = 'delete-btn';
		deleteBtn.textContent = '×'; // Symbole de croix
		deleteBtn.onclick = function ()
		{
			//TODO communiquer avec le Back pour qu'il supprime lui aussi le nom
			let pos = nameList.indexOf(name);
			console.log(nameList.splice(pos, 1));
			// Réintroduire une case vide
			const inputDiv = document.createElement('div');
			const newInput = createInputField(input.dataset.index);  // Créer un nouveau champ avec la même taille

			inputDiv.appendChild(newInput);
			nameContainer.parentNode.replaceChild(inputDiv, nameContainer);

			validatedNames--; // Décrémenter le compteur
		};

		nameContainer.appendChild(nameDiv);
		nameContainer.appendChild(deleteBtn);

		// Remplacer le champ par le conteneur nom + croix
		input.parentNode.replaceChild(nameContainer, input);
	}
}


function lockParticipants(input) {
	console.log(input.length);
}

pages["/Tournament"].funct = affTournament
affTournament()
