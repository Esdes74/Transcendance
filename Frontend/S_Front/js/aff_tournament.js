function affTournament()
{
	let docMain = document.querySelector('main')
	console.log(docMain);
	docMain.innerHTML = `
	<h1 class="display-1">Organisation de Tournoi</h1>
	<div class="buttons">
		<button id="btn1">Tournoi x4</button>
		<button id="btn2">Tournoi x8</button>
		</div>
		<div class="inputs" id="inputs">
		</div>
		<button id="btnValid">Valider</button>
	</div>
	`
	affTournament_init();
	affTournament_EventManager();
}

function affTournament_init()
{
	affTournament_sendRequest({}, 'initDB');
}

function affTournament_EventManager()
{
	document.getElementById('btn1').addEventListener('click', () => affTournament_sendRequest({'btn': 'btn1'}, 'selectTournament'));
	document.getElementById('btn2').addEventListener('click', () => affTournament_sendRequest({'btn': 'btn2'}, 'selectTournament'));
	document.getElementById('btnValid').addEventListener('click', () => affTournament_sendRequest({}, 'validTournament'));
}


// Fonction qui envoie les requêtes à l'API
async function affTournament_sendRequest(data, function_name)
{

	const response = await fetch('/api/tournament/'+ function_name + '/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		credentials: 'include'
	});

	const result = await response.json();
	console.log('Réponse de l\'API :', result);
	console.log('return = ', result.return);

// equivalent du socket.onMessage
	if (result.return == "selectTournament")
	{
		console.log("select recu")
		affTournament_drawTournament(result.size, result.old_size);
	}
	
	else if (result.return == "createPlayer")
	{
		console.log("enter recu")
		console.log("result.index = ", result.index);
		affTournament_createPlayerContainer(result.index);
	}

	else if (result.return == "deletePlayer")
	{
		console.log("delete recu")
		playerContainer = document.getElementById(result.index);
		affTournament_deletePlayerContainer(playerContainer);
	}

	else if (result.return == "error")
	{
		alert(`Erreur : ${result.error} `);
	}

	else if (result.return == "validTournament")
	{
		addScript('/js/aff_tournament_bracket.js', () =>
		{
			affTournamentBracket_start(result.player_list);
		});
	}
}


function affTournament_drawTournament(size, old_size)
{
	console.log("drawTournament");
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

			const input = affTournament_createEmptyField(i);

			newDiv.appendChild(input);
			inputsContainer.appendChild(input);
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

function affTournament_createEmptyField(index)
{
	const div = document.createElement('div');
	console.log("index = ", index);
	// Input field
	const input = document.createElement('input');
	input.type = 'text';
	input.minLength = 2;
	input.maxLength = 8;
	input.placeholder = `Pseudo du participant`;
	input.name = `participant_`;
	// input.id = index;
	input.className = 'input-field';  // Appliquer la classe CSS 'input-field'

	input.addEventListener('keydown', async function (event) {
		if (event.key === 'Enter')
		{
			affTournament_sendRequest({
				'name': input.value,
				'index': index
			}, 'createPlayer');
		}
	});

	// Valid button
	const valid = document.createElement('button');
	valid.className = 'valid-btn';
	valid.textContent = 'Valider';
	// valid.id = index;
	valid.addEventListener('click', function ()
	{
		affTournament_sendRequest({
			'name': input.value,
			'index': index
		}, 'createPlayer');
	})

	div.appendChild(input);
	div.appendChild(valid);
	div.id = index;
	console.log("div = ", div);
	return div;
}



// CREATE PLAYER CONTAINER

function affTournament_createPlayerContainer(index)	// fonction appelée pour créer le playerContainer
{
	const inputBtn = document.getElementById(index);
	const input = inputBtn.querySelector('input');
	const name = input.value; // Récupérer la valeur saisie

	// Le playerContainer est une div qui contient le nom et le bouton de suppression
	const playerContainer = document.createElement('div');
	playerContainer.id = index;

	console.log("input = ", input);

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
	if (inputBtn.parentNode) {
		inputBtn.parentNode.replaceChild(playerContainer, inputBtn);
	}

	deleteBtn.addEventListener('click', function ()
	{
		affTournament_sendRequest({
			'name': name,
			'index': index
		}, 'deletePlayer');
	});
}


// DELETE PLAYER CONTAINER
function affTournament_deletePlayerContainer(playerContainer)
{
	const newInput = affTournament_createEmptyField(playerContainer.id);
	console.log("Voici l'actuel playerContainer : ", playerContainer);

	// on remplace le playerContainer par le div input
	if (playerContainer.parentNode)
	{
		playerContainer.parentNode.replaceChild(newInput, playerContainer);
	}
	console.log("Voici le nouveau playerContainer : ", playerContainer);
}
