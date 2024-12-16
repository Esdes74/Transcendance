function old_affTournament()
{
	let	socket = new WebSocket('/ws/Tournament/');
	let websocketLock = false;

	console.log(socket);
	let docMain = document.querySelector('main')
	console.log(docMain);
	docMain.innerHTML = `
	<h1 class="display-1">Organisation de Tournoi</h1>
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
	old_affTournament_initSocket(socket, websocketLock);
	old_affTournament_EventManager(socket, websocketLock);
}

function old_affTournament_EventManager(socket, websocketLock)
{
	document.getElementById('btn1').addEventListener('click', () => old_affTournament_sendMessage({'file': 'aff', 'type': 'click', 'btn': 'btn1'}, socket, websocketLock));
	document.getElementById('btn2').addEventListener('click', () => old_affTournament_sendMessage({'file': 'aff', 'type': 'click', 'btn': 'btn2'}, socket, websocketLock));
	document.getElementById('btn3').addEventListener('click', () => old_affTournament_sendMessage({'file': 'aff', 'type': 'click', 'btn': 'btn3'}, socket, websocketLock));
	document.getElementById('btnValid').addEventListener('click', () => old_affTournament_sendMessage({'file': 'aff', 'type': 'Valid'}, socket, websocketLock));

	function old_affTournament_HandleViewChangeWrapper(event) {
		old_affTournament_HandleViewChange(socket);
		document.removeEventListener(event.type, old_affTournament_HandleViewChangeWrapper);
	}

	document.addEventListener('pageChanged', old_affTournament_HandleViewChangeWrapper);
 	document.addEventListener('popstate', old_affTournament_HandleViewChangeWrapper);
}

function old_affTournament_HandleViewChange(socket) {
	let currentPath = window.location.pathname;

	console.log(currentPath);
	if (currentPath !== '/tournament') {
		// window.removeEventListener('resize', resizeCanvas);
		console.log("socket closed")
		socket.close();
		// socket = null;
	}
}

function old_affTournament_selectTournament(size, socket, old_size, websocketLock) {
	// Ajouter des nouveaux champs si nécessaire / Supprimer les champs vides en excès si nécessaire
	old_affTournament_inputFieldsManagement(size, old_size, socket, websocketLock);
}

function old_affTournament_inputFieldsManagement(size, old_size, socket, websocketLock)
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

			const input = old_affTournament_createEmptyField(i, socket, websocketLock);

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


function old_affTournament_createEmptyField(index, socket, websocketLock)
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
				old_affTournament_sendMessage({
					'file': 'aff',
					'type': event.key,
					'name': input.value,
					'index': index,
				}, socket, websocketLock);
			}
		}
	});
	return input;
}


function old_affTournament_createPlayerContainer(index, socket, websocketLock)	// fonction appelée pour créer le playerContainer
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
			old_affTournament_sendMessage({
				'file': 'aff',
				'type': 'delete',
				'name': name,
				'index': index,
			}, socket, websocketLock);
		}
	});
}

// 				Exemple de playerContainer
// ##########################################################
// #			playerContainer		id = index				#
// # 			nameDiv				participant i: name		#
// # 			deleteBtn			×						#
// ##########################################################





function old_affTournament_deletePlayerContainer(playerContainer, socket, websocketLock)
{
	const newDiv = document.createElement('div');

	// on créer un nouveau champ input avec un nouvel index
	// let i = 1;
	// while (document.getElementById(i))
	// 	i++;
				// --> obsolete car on peut réutiliser l'index de l'input supprimé

	const newInput = old_affTournament_createEmptyField(playerContainer.id, socket, websocketLock);

	console.log("Voici l'actuel playerContainer : ", playerContainer);

	// on remplace le playerContainer par le div input
	if (playerContainer.parentNode)
	{
		playerContainer.parentNode.replaceChild(newInput, playerContainer);
	}
	console.log("Voici le nouveau playerContainer : ", playerContainer);

}

async function old_affTournament_sendMessage(data, socket, websocketLock) {
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


function old_affTournament_initSocket(socket, websocketLock) {

	socket.onopen = async function (e) {
		console.log("Alleluia, le socket est ouvert");
	};


	socket.onmessage = function (e)
	{
		const data = JSON.parse(e.data);
		if (data.file === 'aff')
		{
			if (data.type === 'click')
			{
				console.log("click")
				old_affTournament_selectTournament(data.size, socket, data.old_size, websocketLock)
			}
			else if (data.type === 'Enter')
			{
				console.log("Enter recu")
				console.log("player_list du Enter : ", data.player_list);
				old_affTournament_createPlayerContainer(data.index, socket, websocketLock);
			}
			else if (data.type === 'delete')
			{
				console.log("delete recu")
				playerContainer = document.getElementById(data.index);
				old_affTournament_deletePlayerContainer(playerContainer, socket, websocketLock);
			}
			else if (data.type === 'error')
			{
				// console.error('Erreur :', data);
				alert
				(
					`Erreur : ${data.error} `
				);
			}
			else if (data.type === 'Valid')
			{
				// alert("Tournoi validé : " + data.player_list);
				// appel du fichier tournament.js et de sa fonction start_tournament() :

				addScript("js/tournament.js", () =>
				{
					tournament_start_tournament(socket);
					// socket.close();
				})

			}
			else
			{
				console.error('Type de message inconnu :', data);
			}
		}
	};

	socket.onerror = function (e) {
		console.error('ah bah là ya une erreur :', e);
	};

	socket.onclose = function (e) {
		//document.removeEventListener('click', e);
		 //document.getElementById('btn1').removeEventListener('click', e);
		// document.getElementById('btn3').removeEventListener('click', e);
		// document.getElementById('btnValid').removeEventListener('click', e);
		socket.close();
		//console.error('Oh non le socket fermé inopinément :', e);
	};

}
	// interdire de valider certains nom (nom vide, nom déjà validé, nom trop long, caractères spéciaux)
	// inderdire de revenir a un mode de tournoi avec moins de participants que ceux déjà validés

//	#########################################################################
// 	#					 _______InputsContainer________						#
// 	#					/				|				\					#
// 	#	PlayerContainer			PlayerContainer			NewDiv				#
// 	#			|						|					\				#
// 	#	nameDiv	+ deleteBtn		nameDiv	+ deleteBtn			name + id		#
// 	#																		#
// ##########################################################################
