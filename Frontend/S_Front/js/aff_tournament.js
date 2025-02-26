var uuid;

function callbackTournament()
{
	tournamentCanvas = document.getElementById("tournamentCanvas")
	initAnimation(tournamentCanvas)
}

async function affTournament()
{
	let docMain = document.querySelector('main')
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
						<div id=error></div>
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
	tradNewPage();
}

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
		errorDiv = document.getElementById('error');
		errorDiv.style.display = "none";
		if (response.status >= 500 && response.status < 600)
		{
			updatePage("50X");
			return;
		}
		const result = await response.json();
		
		if (result.error === 'Unauthorized')
		{
			updatePage("denied");
			return;
		}

		if (result.return && result.return === "initDB")
		{
			uuid = result.uuid
		}

		else if (result.return && result.return === "selectTournament")
		{
			affTournament_drawTournament(result.size, result.old_size);
		}
	
		else if (result.return && result.return === "createPlayer")
		{
			affTournament_createPlayerContainer(result.index);
		}
	
		else if (result.return && result.return === "deletePlayer")
		{
			let playerContainer = document.getElementById(result.index);
			affTournament_deletePlayerContainer(playerContainer);
		}
	
		else if (result.return && result.return === "error" || result.error)
		{
			errorDiv.style.display = "block";
			errorDiv.style.backgroundColor = "lightcoral";
			errorDiv.className = "rounded-pill p-2 fw-bold";
			errorDiv.textContent = result.error;
			errorDiv.setAttribute('data-translate', 'true');
			tradDiv(errorDiv);
		}

		else if (result.return && result.return === "validTournament")
		{
			addScript('/js/aff_tournament_bracket.js', () =>
			{
				affTournamentBracket_start(result.player_list, uuid);
			});
		}
	} catch (error) {
		updatePage("50X");
	}
	tradNewPage()
}

function affTournament_drawTournament(size, old_size)
{
	let inputsContainer = document.getElementById('inputs');
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
		let fieldsToRemove = old_size - size;
		for (let i = existingFields.length - 1; i >= 0 && fieldsToRemove > 0; i--) {
			const field = existingFields[i];
			const input = field.querySelector('input');
			if (input) {
				field.remove();
				fieldsToRemove--;
			}
		}
	}
}

function affTournament_createEmptyField(index)
{
	const div = document.createElement('div');
	const input = document.createElement('input');
	input.type = 'text';
	input.minLength = 2;
	input.maxLength = 8;
	input.size = 16;
	input.style.borderColor = 'white';
	input.style.backgroundColor = 'transparent';
	input.setAttribute('data-translate', 'placeholder');
	input.placeholder = `Pseudo du participant`;
	input.name = `participant_`;
	input.className = 'input-field rounded mx-2 ';
	input.type="text";
	input.addEventListener('keydown', async function (event) {
		if (event.key === 'Enter')
		{
			await affTournament_sendRequest({'name': input.value, 'index': index, 'uuid':uuid}, 'createPlayer');
		}
	});

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
	return div;
}

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
	deleteBtn.textContent = '×';

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

function affTournament_deletePlayerContainer(playerContainer)
{
	const newInput = affTournament_createEmptyField(parseInt(playerContainer.id));

	if (playerContainer.parentNode)
	{
		playerContainer.parentNode.replaceChild(newInput, playerContainer);
	}
}
