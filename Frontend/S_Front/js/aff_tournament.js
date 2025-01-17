var uuid;

function callbackTournament()
{
	tournamentCanvas = document.getElementById("tournamentCanvas")
	initAnimation(tournamentCanvas)
}

async function affTournament()
{
	let docMain = document.querySelector('main')
	console.log(docMain);
	docMain.innerHTML = `
	<div class="container text-center my-5">
		<div class="row justify-content-center">
			<div class="col-md-8">
				<h1 class="mb-5 fw-bold"><span data-translate="true">Organisation du tournoi</span></h1>
				<div class="canvas-container">
					<canvas id="tournamentCanvas" class="w-100" height="400"></canvas>
					<div class="replayBlock">
						<div class="buttons d-flex justify-content-center mb-3">
							<button id="btn1" class="tournament-btn rounded mx-2" data-translate="true">Tournoi ×4</button>
							<button id="btn2" class="tournament-btn rounded mx-2" data-translate="true">Tournoi ×8</button>
						</div>
						<div class="inputs" id="inputs">
						</div>
						<button id="btnValid" class="tournament-btn rounded mt-3" data-translate="true" >Valider</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	`
	addScript('/js/indexPong.js', callbackTournament);
	document.querySelector(".replayBlock").style.display = "block"
	await affTournament_init();
	affTournament_EventManager();
}

// TODO:fix bug claasement de fin callback	+ verification avec des try except dans le js si le client a été déconnecté (duplicate page si un dans tournoi et l'autres logout)

async function affTournament_init()
{
	await affTournament_sendRequest({}, 'initDB');
}

function affTournament_EventManager()
{
	document.getElementById('btn1').addEventListener('click', () => affTournament_sendRequest({'btn': 'btn1', 'uuid':uuid}, 'selectTournament'));
	document.getElementById('btn2').addEventListener('click', () => affTournament_sendRequest({'btn': 'btn2', 'uuid':uuid}, 'selectTournament'));
	document.getElementById('btnValid').addEventListener('click', () => affTournament_sendRequest({'uuid':uuid}, 'validTournament'));
}

async function affTournament_sendRequest(data, function_name)
{

	try
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
		
		if (result.detail === 'Unauthorized')
		{
			updatePage("denied");
			return;
		}

		if (result.return && result.return === "initDB")
		{
			console.log("initDB recu uuid")
			uuid = result.uuid
		}

		else if (result.return && result.return === "selectTournament")
		{
			console.log("select recu")
			affTournament_drawTournament(result.size, result.old_size);
		}
	
		else if (result.return && result.return === "createPlayer")
		{
			console.log("enter recu")
			console.log("result.index = ", result.index);
			affTournament_createPlayerContainer(result.index);
		}
	
		else if (result.return && result.return === "deletePlayer")
		{
			console.log("delete recu")
			let playerContainer = document.getElementById(result.index);
			affTournament_deletePlayerContainer(playerContainer);
		}
	
		else if (result.return && result.return === "error" || result.error)
		{
			alert(`Erreur : ${result.error} `);
		}

		else if (result.return && result.return === "validTournament")
		{
			addScript('/js/aff_tournament_bracket.js', () =>
			{
				affTournamentBracket_start(result.player_list, uuid);
			});
		}
	} catch (error) {
		alert("Une erreur est survenue lors de la requête :", error);
	}
}


function affTournament_drawTournament(size, old_size)
{
	console.log("drawTournament");
	let inputsContainer = document.getElementById('inputs');
	console.log("inputsContainer = ", inputsContainer);
	if (old_size < size)
	{
		let n = 0;
		while (old_size + n < size)
		{
			const newDiv = document.createElement('div');

			let i = 0;
			while (document.getElementById(`${i}`))
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
		console.log("fieldsToRemove = ", fieldsToRemove);
		for (let i = existingFields.length - 1; i >= 0 && fieldsToRemove > 0; i--) {
			const field = existingFields[i];
			const input = field.querySelector('input');
			console.log("LE INPUTinput = ", input);
			if (input) {		//&& !input.value.trim()
				console.log("field = ", field);
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
	const input = document.createElement('input');
	input.type = 'text';
	input.minLength = 2;
	input.maxLength = 8;
	input.size = 15;
	input.style.borderColor = 'white';
	input.style.backgroundColor = 'transparent';
	// input.style.filter = 'blur(2px)';
	input.setAttribute('data-translate', 'placeholder');
	input.placeholder = `Pseudo du participant`;
	input.name = `participant_`;
	input.className = 'input-field rounded mx-2 ';  // Appliquer la classe CSS 'input-field'

	input.addEventListener('keydown', async function (event) {
		if (event.key === 'Enter')
		{
			await affTournament_sendRequest({'name': input.value, 'index': index, 'uuid':uuid}, 'createPlayer');
		}
	});

	// Valid button
	const valid = document.createElement('button');
	valid.className = 'tournament-btn rounded';
	valid.textContent = 'Valider';
	valid.setAttribute('data-translate', 'true');
	valid.addEventListener('click', async function ()
	{
		await affTournament_sendRequest({'name': input.value, 'index': index, 'uuid':uuid}, 'createPlayer');
	})
	div.className = 'd-flex justify-content-center rounded mt-2 mb-2';
	div.appendChild(input);
	div.appendChild(valid);
	div.id = index;
	tradDiv(div);
	console.log("div = ", div);
	return div;
}



// CREATE PLAYER CONTAINER
function affTournament_createPlayerContainer(index)
{
	const inputBtn = document.getElementById(index);
	const input = inputBtn.querySelector('input');
	const name = input.value;

	const playerContainer = document.createElement('div');
	playerContainer.id = index;

	const nameDiv = document.createElement('div');
	nameDiv.className = 'rounded-pill mx-auto';
	nameDiv.textContent = `${name}`;
	
	const deleteBtn = document.createElement('button');
	deleteBtn.className = 'delete-btn rounded-pill px-4';
	deleteBtn.textContent = '×'; // Symbole de croix

	playerContainer.className = 'd-flex align-items-center my-3 player-container rounded-pill';
	playerContainer.appendChild(nameDiv);
	playerContainer.appendChild(deleteBtn);

	if (inputBtn.parentNode) {
		inputBtn.parentNode.replaceChild(playerContainer, inputBtn);
	}

	deleteBtn.addEventListener('click', async function ()
	{
		await affTournament_sendRequest({'name': name, 'index': index, 'uuid':uuid}, 'deletePlayer');
	});
}


// DELETE PLAYER CONTAINER
function affTournament_deletePlayerContainer(playerContainer)
{
	const newInput = affTournament_createEmptyField(playerContainer.id);
	console.log("Voici l'actuel playerContainer : ", playerContainer);

	if (playerContainer.parentNode)
	{
		playerContainer.parentNode.replaceChild(newInput, playerContainer);
	}
}
