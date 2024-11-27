function affTournament()
{
	let	socket = new WebSocket('/ws/Tournament/');
	let	currentFields= 0;

	console.log(socket);
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<h1>Organisation de Tournoi</h1>
	<div class="buttons">
    	<button id="btn1">Tournoi x3</button>
   		<button id="btn2">Tournoi x4</button>
    	<button id="btn3">Tournoi x8</button>
<!--    	<button id="btnValid">valider</button>-->
	</div>
	<div class="inputs" id="inputs">
	</div>
	</div>
	`
	document.getElementById('btn1').addEventListener('click', () => {currentFields = selectTournament(3, socket, currentFields)});
	document.getElementById('btn2').addEventListener('click', () => {currentFields = selectTournament(4, socket, currentFields)});
	document.getElementById('btn3').addEventListener('click', () => {currentFields = selectTournament(8, socket, currentFields)});
	// document.getElementById('btnValid').addEventListener('click', lockParticipants());
}

function selectTournament(numberOfParticipants, socket, currentFields) {
	// Ajouter des nouveaux champs si nécessaire
	const	inputsContainer = document.getElementById('inputs');
	currentFields = createInputField(numberOfParticipants, currentFields, socket, inputsContainer);

	// Supprimer les champs vides en excès si nécessaire
	currentFields = deleteInputField(numberOfParticipants, currentFields, inputsContainer);

	return (currentFields);
	// //TODO Si trop de noms validés pour le nouveau tournoi, afficher un message d'erreur
	// if (validatedNames > numberOfParticipants)
	// {
	// 	alert(
	// 		`Impossible de passer à un tournoi avec ${numberOfParticipants} participants.
	//       Vous avez déjà validé ${validatedNames} noms. Supprimez des noms avant de changer.`
	// 	);
	// 	return;
	// }

}

function deleteInputField(numberOfParticipants, currentFields, inputsContainer)
{
	const existingFields = Array.from(inputsContainer.children);

	if (numberOfParticipants < currentFields)
	{
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
	return currentFields;
}

function createInputField(numberOfParticipants, currentFields, socket, inputsContainer)
{
	while (currentFields < numberOfParticipants)
	{
		const inputDiv = document.createElement('div');
		const input = createFields(currentFields + 1, socket, inputsContainer);

		inputDiv.appendChild(input);
		inputsContainer.appendChild(inputDiv);
		currentFields++;
	}
	return currentFields;
}

function createFields(index, socket, inputsContainer)
{
	const input = document.createElement('input');
	input.type = 'text';
	input.minLength = 4;
	input.maxLength = 8;
	input.placeholder = `Pseudo du participant`;
	input.name = `participant_`;
	input.dataset.index = index;
	input.className = 'input-field';  // Appliquer la classe CSS 'input-field'

	// Gestion de la validation par Entrée
	input.addEventListener('keydown', function (event) {
		if (event.key === 'Enter')
		{
			if (socket.readyState === WebSocket.OPEN)
			{
				sendMessage({
					'type': name,
					'key': event.key
				}, socket);
			}
			validateField(input, index, inputsContainer);
		}

	});
	return input;
}

function validateField(input, index, inputsContainer) {
	const name = input.value.trim(); // Récupérer la valeur saisie
	// const inputIndex = input.dataset.index;
//TODO verification qui doit etre passé dans le back
		const nameContainer = document.createElement('div');
		nameContainer.className = 'name-container';

		const nameDiv = document.createElement('div');
		nameDiv.className = 'name';
		nameDiv.textContent = `Participant ${index} : ${name}`;

		const deleteBtn = document.createElement('button');
		deleteBtn.className = 'delete-btn';
		deleteBtn.textContent = '×'; // Symbole de croix
		deleteBtn.onclick = function ()
		{
//TODO communiquer avec le Back pour qu'il supprime lui aussi le nom
			// Réintroduire une case vide
			const inputDiv = document.createElement('div');
			const newInput = createFields(input.dataset.index, inputsContainer);
// 			const newInput = createInputField(input.dataset.index, socket);  // Créer un nouveau champ avec la même taille
			inputDiv.appendChild(newInput);
			nameContainer.parentNode.replaceChild(inputDiv, nameContainer);
		};
		nameContainer.appendChild(nameDiv);
		nameContainer.appendChild(deleteBtn);
		// Remplacer le champ par le conteneur nom + croix
		input.parentNode.replaceChild(nameContainer, input);
	// }
}

async function sendMessage(data, socket) {
	if (socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(data));
	}
}





pages["/Tournament"].funct = affTournament
affTournament()





















// function affTournament()
// {
// 	let validatedNames;
// 	validatedNames= 0; // Compteur des noms validés
// 	let currentFields;
// 	currentFields = 0; // Nombre total de champs actuellement affichés
// 	let nameList;
// 	nameList= [];
// 	let socket ;
// 	socket = new WebSocket('/ws/Tournament/');
//
// 	initSocket(socket);
//
// 	let docMain = document.querySelector('main')
// 	docMain.innerHTML = `
// 	<h1>Organisation de Tournoi</h1>
// 	<div class="buttons">
//     	<button onclick="selectTournament(3, nameList, socket)">Tournoi x3</button>
//    		<button onclick="selectTournament(4, nameList, socket)">Tournoi x4</button>
//     	<button onclick="selectTournament(8, nameList, socket,)">Tournoi x8</button>
//     	<button onclick="lockParticipants(nameList, socket)">valider</button>
// 	</div>
// 	<div class="inputs" id="inputs">
// 	</div>
// 	</div>
// 	`
// 	async function sendMessage(data, socket, websocketLock) {
// 		if (websocketLock) {
// 			return;
// 		}
// 		websocketLock = true;
// 		if (socket.readyState === WebSocket.OPEN) {
// 			socket.send(JSON.stringify(data));
// 		}
//
// 		websocketLock = false;
// 	}
// 	socket.onmessage = function (e)
// 	{
// 		const data = JSON.parse(e.data);
// 		if (data.type === 'pong.update') {
// 			console.log("message envoyer")
// 		}
// 	};
// }
//
//
// function selectTournament(numberOfParticipants, nameList, socket) {
// 	const inputsContainer = document.getElementById('inputs');
//
// 	// Si trop de noms validés pour le nouveau tournoi, afficher un message d'erreur
// 	if (validatedNames > numberOfParticipants)
// 	{
// 		alert(
// 			`Impossible de passer à un tournoi avec ${numberOfParticipants} participants.
//           Vous avez déjà validé ${validatedNames} noms. Supprimez des noms avant de changer.`
// 		);
// 		return;
// 	}
//
// 	// Gestion des champs existants
// 	const existingFields = Array.from(inputsContainer.children);
//
// 	// Supprimer les champs vides en excès si nécessaire
// 	if (numberOfParticipants < currentFields) {
// 		let fieldsToRemove = currentFields - numberOfParticipants;
// 		for (let i = existingFields.length - 1; i >= 0 && fieldsToRemove > 0; i--) {
// 			const field = existingFields[i];
// 			const input = field.querySelector('input');
// 			if (input && !input.value.trim()) {
// 				field.remove();
// 				fieldsToRemove--;
// 				currentFields--;
// 			}
// 		}
// 	}
//
// 	// Ajouter des nouveaux champs si nécessaire
// 	while (currentFields < numberOfParticipants)
// 	{
// 		const inputDiv = document.createElement('div');
// 		const input = createInputField(currentFields + 1, socket);
//
// 		inputDiv.appendChild(input);
// 		inputsContainer.appendChild(inputDiv);
// 		currentFields++;
// 	}
// }
//
// function initSocket(socket) {
// 	/// Gestion de l'ouverture de la connexion WebSocket \\\
//
// 	socket.onopen = async function (e) {
// 		console.log("WebSocket is connected ouais");
// 	};
// }
// async function sendMessage(data, socket) {
//
// 	if (socket.readyState === WebSocket.OPEN) {
// 		console.log(`NOM ENVOYÉ`);
// 		socket.send(JSON.stringify(data));
// 	}
// }
// function createInputField(index, socket) {
// 	const input = document.createElement('input');
// 	input.type = 'text';
// 	input.minLength = 4;
// 	input.minLength = 8;
// 	input.placeholder = `Pseudo du participant ${index}`;
// 	input.name = `participant_${index}`;
// 	input.dataset.index = index;
// 	input.className = 'input-field';  // Appliquer la classe CSS 'input-field'
//
// 	// Gestion de la validation par Entrée
// 	input.addEventListener('keydown', function (event, socket) {
// 		if (event.key === 'Enter')
// 		{
// 			if (socket.readyState === WebSocket.OPEN)
// 			{
// 				sendMessage({
// 					'type': name,
// 					'key': event.key
// 				}, socket);
// 			}
// 			validateField(input);
// 		}
//
// 	});
//
// 	return input;
// }
//
// //TODO Message de reponse en fonction de ce que renvoi le back
// function alert_message(name)
// {
// 	let message;
//
// 	if (!name)
// 		message = 'un nom ne peut etre vide';
// 	else if (name.length > 8)
// 		message = 'merci de saisir un nom avec moins de 9 caracteres';
// 	else if (name.length < 4)
// 		message = 'merci de saisir un nom avec plus de 3 caracteres';
// 	else
// 		message = 'le nom a deja été saisi';
// 	alert(message);
// }
//
// function validateField(input, socket) {
// 	const name = input.value.trim(); // Récupérer la valeur saisie
// 	//TODO verification qui doit etre passé dans le back
// 	if (!name || name.length < 4 || name.length > 8 || name === nameList.find(name => name === name))
// 	{
// 		alert_message(name);
// 	}
// 	else {
// 		validatedNames++; // Incrémenter le compteur de noms validés
// 		nameList.push(name);
// 		const nameContainer = document.createElement('div');
// 		nameContainer.className = 'name-container';
//
// 		const nameDiv = document.createElement('div');
// 		nameDiv.className = 'name';
// 		nameDiv.textContent = `Participant ${input.dataset.index} : ${name}`;
//
// 		const deleteBtn = document.createElement('button');
// 		deleteBtn.className = 'delete-btn';
// 		deleteBtn.textContent = '×'; // Symbole de croix
// 		deleteBtn.onclick = function ()
// 		{
// 			//TODO communiquer avec le Back pour qu'il supprime lui aussi le nom
// 			let pos = nameList.indexOf(name);
// 			console.log(nameList.splice(pos, 1));
// 			// Réintroduire une case vide
// 			const inputDiv = document.createElement('div');
// 			const newInput = createInputField(input.dataset.index, socket);  // Créer un nouveau champ avec la même taille
//
// 			inputDiv.appendChild(newInput);
// 			nameContainer.parentNode.replaceChild(inputDiv, nameContainer);
//
// 			validatedNames--; // Décrémenter le compteur
// 		};
//
// 		nameContainer.appendChild(nameDiv);
// 		nameContainer.appendChild(deleteBtn);
//
// 		// Remplacer le champ par le conteneur nom + croix
// 		input.parentNode.replaceChild(nameContainer, input);
// 	}
// }
//
//
// function lockParticipants(input) {
// 	console.log(input.length);
// }
//
// pages["/Tournament"].funct = affTournament
// affTournament()
