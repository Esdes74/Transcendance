function affTournament()
{
    let docMain = document.querySelector('main')
    docMain.innerHTML = `
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Tournoi</h1>
			</div>	
		</div>
		<div class="row">
			<div class="col-12">
				<div id="tournament"></div>
			</div>
		</div>
	</div>
	`
	let socket = new WebSocket("/ws/tournament/");
	socket.onmessage = function(event) {
		let data = JSON.parse(event.data);
		let docTournament = document.getElementById('tournament')
		// afficher une page simple avec le nom du tournoi
		docTournament.innerHTML = `
			<div class="row">
				<div class="col-12">
					<h2 class="text-center">${data.name}</h2>
				</div>
			</div>
		`
	}
	
	// `
	// 		<div class="row">
	// 			<div class="col-12">
	// 				<h2 class="text-center">${data.name}</h2>
	// 			</div>
	// 		</div>
	// 		<div class="row">
	// 			<div class="col-12">
	// 				<h3 class="text-center">Participants</h3>
	// 			</div>
	// 		</div>
	// 		<div class="row">
	// 			<div class="col-12">
	// 				<ul id="participants" class="list-group"></ul>
	// 			</div>
	// 		</div>
	// 		<div class="row">
	// 			<div class="col-12">
	// 				<h3 class="text-center">Matchs</h3>
	// 			</div>
	// 		</div>
	// 		<div class="row">
	// 			<div class="col-12">
	// 				<ul id="matches" class="list-group"></ul>
	// 			</div>
	// 		</div>
	// 	`
	// 	let docParticipants = document.getElementById('participants')
	// 	for (let i = 0; i < data.participants.length; i++) {
	// 		docParticipants.innerHTML += `<li class="list-group-item">${data.participants[i]}</li>`
	// 	}
	// 	let docMatches = document.getElementById('matches')
	// 	for (let i = 0; i < data.matches.length; i++) {
	// 		docMatches.innerHTML += `
	// 			<li class="list-group
	// 			${data.matches[i].winner == data.matches[i].player1 ? 'list-group-item-success' : ''}
	// 			${data.matches[i].winner == data.matches[i].player2 ? 'list-group-item-danger' : ''}
	// 			">
	// 				${data.matches[i].player1} vs ${data.matches[i].player2}
	// 			</li>
	// `
}
pages["/tournament"].funct = affTournament
affTournament()
