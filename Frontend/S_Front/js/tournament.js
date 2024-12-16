async function tournament_start_tournament(socket1)
{

	data = {}

	const response = await fetch('/api/tournament/selectTournament/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
		credentials: 'include'
	});


	const result = await response.json();
	console.log('Réponse de l\'API :', result);
	if (result.number)





	
	websocketLock = false;
	let docMain = document.querySelector('main')
	// <button class="btn btn-outline-light m-2" id="start" data-translate="true">Start the Game (lance pong.js)</button>
	docMain.innerHTML = `
	<h1 class="display-1">MATCHMAKING</h1>

	<div id="algo">
		<div class="container text-center">
			<div id="player-list" class="row row-cols-1 justify-content-center mt-2">

			</div>
		</div>
    </div>
	`
	tournament_initSocket(socket1, websocketLock);
	console.log("etat du websocketlock :", websocketLock);
	tournament_sendMessage({
		'file': 'tournament',
		'msg': 'give_me_list',
	}, socket1, websocketLock);
	console.log("hello !");
	// console.log("player_list : ", player_list);
}

function tournament_initSocket(socket1, websocketLock) {
	// Handle the WebSocket events
	socket1.onopen = function (e) {
		console.log("WebSocket is open now.");
	};

	socket1.onmessage = function (e)
	{
		const data = JSON.parse(e.data);
		if (data.file === 'tournament')
		{
			// tournament_start_tournament(data.player_list);
			console.log("liste : ", data.player_list);
			socket1.close();
		}
		else
		{
			console.error('Type de message inconnu :', data);
		}
	}
	socket1.onerror = function (e) {
		console.error('WebSocket error observed:', e);
	};

	socket1.onclose = function (e) {
		console.log('WebSocket is closed now.', e);
	};
}

async function tournament_sendMessage(data, socket, websocketLock) {
	if (websocketLock)
	{
		console.log("etat  :", websocketLock);
		return;
	}
	websocketLock = true;
	if (socket.readyState === WebSocket.OPEN)
	{
		console.log("etat  :", websocketLock);
		socket.send(JSON.stringify(data));
	}
	websocketLock = false;
}
