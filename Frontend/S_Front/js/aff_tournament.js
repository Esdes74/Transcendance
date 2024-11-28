function affTournament()
{
	let	socket = new WebSocket('/ws/Tournament/');
	websocketLock = false;

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
	initSocket(socket);
	document.getElementById('btn1').addEventListener('click', () => sendMessage({'type': 'click', 'btn': 'btn1'}, socket, websocketLock));
	document.getElementById('btn2').addEventListener('click', () => sendMessage({'type': 'click', 'btn': 'btn2'}, socket, websocketLock));
	document.getElementById('btn3').addEventListener('click', () => sendMessage({'type': 'click', 'btn': 'btn3'}, socket, websocketLock));
	// document.getElementById('btnValid').addEventListener('click', lockParticipants());
}

function selectTournament(size, socket, old_size, champs_libre) {
	// Ajouter des nouveaux champs si nécessaire
	// const	inputsContainer = document.getElementById('inputs');
	old_size = createInputField(size, old_size, champs_libre, socket);
	// Supprimer les champs vides en excès si nécessaire
	old_size = deleteInputField(size, old_size, champs_libre);

	return (old_size);
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

function deleteInputField(size, old_size, champs_libre)
{
	inputsContainer = document.getElementById('inputs');
	const existingFields = Array.from(inputsContainer.children);

	if (old_size > size)
	{
		let fieldsToRemove = old_size - size;
		for (let i = existingFields.length - 1; i >= 0 && fieldsToRemove > 0; i--) {
			const field = existingFields[i];
			const input = field.querySelector('input');
			if (input && !input.value.trim()) {
				field.remove();
				fieldsToRemove--;
				old_size--;
			}
		}
		// parcourir la liste des players et reinitialiser les indices
		for (let i = 0; i < champs_libre.length; i++)
		{
			champs_libre[i] = i + 1;
		}

	}
	return old_size;
}

function createInputField(size, old_size, champs_libre, socket)
{
	inputsContainer = document.getElementById('inputs');
	// console.log("createInputField : size = ", size, "currentFields = ", currentFields);
	while (old_size < size)
	{
		const inputDiv = document.createElement('div');
		const input = createFields(old_size + 1, socket);

		inputDiv.appendChild(input);
		inputsContainer.appendChild(inputDiv);
		old_size++;
	}
	return old_size;
}

function createFields(index, socket)
{
	const input = document.createElement('input');
	input.type = 'text';
	input.minLength = 4;
	input.maxLength = 8;
	input.placeholder = `Pseudo du participant`;
	input.name = `participant_`;
	input.dataset.index = index;
	input.id = index;
	input.className = 'input-field';  // Appliquer la classe CSS 'input-field'

	// Gestion de la validation par Entrée
	input.addEventListener('keydown', function (event) {
		if (event.key === 'Enter')
		{
			if (socket.readyState === WebSocket.OPEN)
			{
				sendMessage({
					'type': event.key,
					'name': input.value,
					'index': index,
				}, socket);
			}
		}
	});
	return input;
}

function validateField(index, socket) {
	const input = document.getElementById(index);
	console.log("input = ", input);
    const name = input.value; // Récupérer la valeur saisie

    const nameContainer = document.createElement('div');
    nameContainer.className = 'name-container';
	nameContainer.id = index;
    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.textContent = `Participant ${index} : ${name}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×'; // Symbole de croix

	// addeventlistener pour deleteBtn
	deleteBtn.addEventListener('click', function () {
	
		if (socket.readyState === WebSocket.OPEN)
		{	
			console.log("nameContainer == : ", nameContainer);
			sendMessage({
				'type': 'delete',
				'name': name,
				'index': index,
				// 'nameContainer': nameContainer,
			}, socket);
		}
	});


    nameContainer.appendChild(nameDiv);
    nameContainer.appendChild(deleteBtn);

    // Remplacer le champ par le conteneur nom + croix
    if (input.parentNode) {
        input.parentNode.replaceChild(nameContainer, input);
    } else {
        console.error('input has no parent node');
    }
}

async function sendMessage(data, socket, websocketLock) {
	if (websocketLock) {
		return;
	}
	websocketLock = true;
	if (socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify(data));
	}

	websocketLock = false;
}

function initSocket(socket) {
	
	
	socket.onopen = async function (e) {
		console.log("Alleluia, le socket est ouvert");
	};

	
	socket.onmessage = function (e)
	{
		const data = JSON.parse(e.data);
		if (data.type === 'click')
		{
			console.log("click")
			selectTournament(data.size, socket, data.old_size, data.champs_libre)
		}
		else if (data.type === 'Enter')
		{
			console.log("Enter recu")
			console.log("player_list du Enter : ", data.player_list);
			validateField(data.index, socket);
		}
		else if (data.type === 'delete')
		{
			console.log("delete recu")
			nameContainer = document.getElementById(data.index);
			const inputDiv = document.createElement('div');
        	const newInput = createFields(data.index, socket);
			inputDiv.appendChild(newInput);
			console.log("nameContainer ===== ", nameContainer);
        	if (nameContainer.parentNode)
			{
           		nameContainer.parentNode.replaceChild(inputDiv, nameContainer);
				console.log("player_list du Delete: ", data.player_list);
        	}
			else
			{
        	    console.error('nameContainer has no parent node');
        	}
			// const nameContainer = document.querySelector(`.name-container`);
			// nameContainer.remove();
		}
		else if (data.type === 'error')
		{
			console.error('Erreur :', data);
		}
		else
		{
			console.error('Type de message inconnu :', data);
		}
	};

	socket.onerror = function (e) {
		console.error('ah bah là ya une erreur :', e);
	};

	socket.onclose = function (e) {
		console.error('Oh non le socket fermé inopinément :', e);
	};

}
	
	// TODO: addeventlistener global pour les champs input -> sinon impossible de re Enter après avoir supp un nom
	// todo: pouvoir re Enter apres l'avoir supp
	// fix les index des champs input () car création de plusieurs champs input avec le même index
	// interdire de valider certains nom (nom vide, nom déjà validé, nom trop long, caractères spéciaux)
	// inderdire de revenir a un mode de tournoi avec moins de participants que ceux déjà validés
	
pages["/Tournament"].funct = affTournament
affTournament()
