function affTournamentBracket_start(player_list)
{
	let docMain = document.querySelector('main')
	// <button class="btn btn-outline-light m-2" id="start" data-translate="true">Start the Game (lance pong.js)</button>
	docMain.innerHTML = `
	<h1 class="display-1">Matchmaking</h1>

	<div id="algo">
		<div class="container text-center">
			<div id="player-list" class="row row-cols-1 justify-content-center mt-2">

			</div>
		</div>
    </div>
	`
	console.log("hello !");
	console.log("player_list : ", player_list);
	tournoiSuisse(player_list, 3);
}


    // document.getElementById('start').addEventListener('click', function() {

    // 	addScript("/js/aff_pong.js", () => {
    // 		affPong(player_list[0], player_list[1]);
    // 		// envoyer les players et stocker les scores
    // 		// socket.close();		//peut etre pas le fermer car besoin des données ("on a besoin de lui pour envoyer les scores")
    // 	});
    // });
