
async function aff_leaderboard(result)
{
	let docMain = document.querySelector('main')
	// <button class="btn btn-outline-light m-2" id="start" data-translate="true">Start the Game (lance pong.js)</button>
	docMain.innerHTML = `
	<div class="text-center table border p-2">
		<table class="table">
			<h5 data-translate="true">Leaderboard</h5>
			<tbody id="ladder" class="table-group-divider">

			</tbody>
		</table>
	</div>
	`

	const tbodyElement = document.getElementById('ladder');
	result.leaderboard.forEach((player, index) => {

		const thPlayer = document.createElement('th');
		thPlayer.scope = 'row';
		thPlayer.textContent = player;

		const tdScore = document.createElement('td');
		tdScore.textContent = result.score[index];

		const trElement = document.createElement('tr');
		trElement.appendChild(thPlayer);
		trElement.appendChild(tdScore);
		
		tbodyElement.appendChild(trElement);
	});
}
