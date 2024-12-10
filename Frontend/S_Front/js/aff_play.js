function playCallback() {
	loadPlayOptions()
}

function affPlay() {
	let docMain = document.querySelector('main')
	docMain.innerHTML = `
	<div class="container-fluid">
		<div class="row margin py-4 my-2">
				<div class="col-4">
					<div class="card" link="pong" style="width: 18rem;">
						<img src="/png/pong.png" class="card-img-top img-fluid" alt="Card image cap">
						<div class="card-body">
							<h5 class="card-title text-center fw-bold">Mode Duo</h5>
							<p class="card-text text-center">Affronte un ami</p>
						</div>
					</div>
				</div>
				<div class="col-4">
					<div class="card" link="ai" style="width: 18rem;">
						<img src="/png/solo.png" class="card-img-top img-fluid" alt="Card image cap">
						<div class="card-body">
							<h5 class="card-title text-center fw-bold">Mode Solo</h5>
							<p class="card-text text-center">Affronte un robot</p>
						</div>
					</div>
				</div>
				<div class="col-4">
					<div class="card" link="tournament" style="width: 18rem;">
						<img src="/png/tournament.png" class="class="card-img-top img-fluid" alt="Card image cap">
						<div class="card-body">
							<h5 class="card-title text-center fw-bold">Mode Tournoi</h5>
							<p class="card-text text-center">Tournoi de 3 - 8 joueurs</p>
						</div>
					</div>
				</div>
		</div>
	</div>
    `
	addScript("/js/playOptions.js", playCallback)
	tradNewPage()
}
