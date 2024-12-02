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
		</div>
		<div class="inputs" id="inputs">
		</div>
		<button id="btnValid">Valider</button>
	</div>
	`
	initSocket(socket);
	document.getElementById('btn1').addEventListener('click', () => sendMessage({'type': 'click', 'btn': 'btn1'}, socket, websocketLock));
	document.getElementById('btn2').addEventListener('click', () => sendMessage({'type': 'click', 'btn': 'btn2'}, socket, websocketLock));
	document.getElementById('btn3').addEventListener('click', () => sendMessage({'type': 'click', 'btn': 'btn3'}, socket, websocketLock));
	document.getElementById('btnValid').addEventListener('click', () => sendMessage({'type': 'Valid'}, socket, websocketLock));
}

function selectTournament(size, socket, old_size, champs_libre) {
	// Ajouter des nouveaux champs si nécessaire / Supprimer les champs vides en excès si nécessaire
	inputFieldsManagement(size, old_size, champs_libre, socket);

	// return (old_size);
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

function inputFieldsManagement(size, old_size, champs_libre, socket)
{
	inputsContainer = document.getElementById('inputs');
	console.log("inputsContainer = ", inputsContainer);
	if (old_size < size)
	{
		let n = 0;
		while (old_size + n < size)
		{
			const newDiv = document.createElement('div');
			
			let i = 0;
			while (document.getElementById(i))
				i++;
			
			const input = createEmptyField(i, socket);
			
			newDiv.appendChild(input);
			inputsContainer.appendChild(newDiv);
			n++;
		}
	}
	else if (old_size > size)
	{
		const existingFields = Array.from(inputsContainer.children);
		console.log("existingFields = ", existingFields);
		let fieldsToRemove = old_size - size;
		for (let i = existingFields.length - 1; i >= 0 && fieldsToRemove > 0; i--) {
			const field = existingFields[i];
			const input = field.querySelector('input');
			if (input && !input.value.trim()) {
				field.remove();
				fieldsToRemove--;
			}
		}
	}
}


function createEmptyField(index, socket)
{
	const input = document.createElement('input');
	input.type = 'text';
	input.minLength = 2;
	input.maxLength = 8;
	input.placeholder = `Pseudo du participant`;
	input.name = `participant_`;
	input.id = index;
	input.className = 'input-field';  // Appliquer la classe CSS 'input-field'

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


function createPlayerContainer(index, socket)	// fonction appelée pour créer le playerContainer
{
	const input = document.getElementById(index);
	const name = input.value; // Récupérer la valeur saisie

	// Le playerContainer est une div qui contient le nom et le bouton de suppression
	const playerContainer = document.createElement('div');
	playerContainer.id = index;

	// playerContainer.className = 'name-container';	-> pas besoin car on peut le supp directement depuis le playerContainer
	console.log("playerContainer = ", playerContainer);

	// div qui contient le nom
	const nameDiv = document.createElement('div');
	nameDiv.className = 'name';
	nameDiv.textContent = `Participant : ${name}`;
	playerContainer.appendChild(nameDiv);

	// bouton de suppression
	const deleteBtn = document.createElement('button');
	deleteBtn.className = 'delete-btn';
	deleteBtn.textContent = '×'; // Symbole de croix
	playerContainer.appendChild(deleteBtn);

	// on remplace le div input par le playerContainer
	if (input.parentNode) {
		input.parentNode.replaceChild(playerContainer, input);
	}

	deleteBtn.addEventListener('click', function ()
	{
		if (socket.readyState === WebSocket.OPEN)
		{
			console.log("playerContainer == : ", playerContainer);
			sendMessage({
				'type': 'delete',
				'name': name,
				'index': index,
			}, socket);
		}
	});
}

// 				Exemple de playerContainer
// ##########################################################
// #			playerContainer		id = index				#
// # 			nameDiv				participant i: name		#
// # 			deleteBtn			×						#
// ##########################################################





function deletePlayerContainer(playerContainer, socket)
{
	const newDiv = document.createElement('div');

	// on créer un nouveau champ input avec un nouvel index
	// let i = 1;
	// while (document.getElementById(i))
	// 	i++;				
				// --> obsolete car on peut réutiliser l'index de l'input supprimé

	const newInput = createEmptyField(playerContainer.id, socket);

	console.log("Voici l'actuel playerContainer : ", playerContainer);

	// on remplace le playerContainer par le div input
	if (playerContainer.parentNode)
	{
		playerContainer.parentNode.replaceChild(newInput, playerContainer);
	}
	console.log("Voici le nouveau playerContainer : ", playerContainer);

}

async function sendMessage(data, socket, websocketLock) {
	if (websocketLock)
	{
		return;
	}
	websocketLock = true;
	if (socket.readyState === WebSocket.OPEN)
	{
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
			createPlayerContainer(data.index, socket);
		}
		else if (data.type === 'delete')
		{
			console.log("delete recu")
			playerContainer = document.getElementById(data.index);
			deletePlayerContainer(playerContainer, socket);
		}
		else if (data.type === 'error')
		{
			// console.error('Erreur :', data);
			alert
			(
				`Oula : ${data.error} `
			);
		}
		else if (data.type === 'Valid')
		{
			alert("Tournoi validé : " + data.player_list);
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
	// interdire de valider certains nom (nom vide, nom déjà validé, nom trop long, caractères spéciaux)
	// inderdire de revenir a un mode de tournoi avec moins de participants que ceux déjà validés
	
pages["/Tournament"].funct = affTournament
affTournament()


//	#########################################################################
// 	#					 _______InputsContainer________						#
// 	#					/				|				\					#
// 	#	PlayerContainer			PlayerContainer			NewDiv				#
// 	#			|						|					\				#
// 	#	nameDiv	+ deleteBtn		nameDiv	+ deleteBtn			name + id		#
// 	#																		#
// ##########################################################################
