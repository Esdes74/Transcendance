function loadDuplicatePong(myCanvas)
{		
	const gameSettings = {
		canvas: myCanvas,
		paddleWidth: 10,
		paddleHeight: 0,
		paddleBuffer: 0,

		ballPosX: 0.0512,
		paddle1Y: 0,
		paddle2Y: 0,
		player1: 0.5,
		player2: 0.5,
		upPress: false,
		downPress: false,
		stopAnim: false,
	};

	resizeDuplicateCanvas(gameSettings);
	gameSettings.printBall = true;
	let height = gameSettings.canvas.height;
	let width = gameSettings.canvas.width;
	gameSettings.paddle1Y = (gameSettings.canvas.height - gameSettings.paddleHeight) * gameSettings.player1;
	gameSettings.paddle2Y = gameSettings.paddle1Y;
	window.addEventListener('popstate', (event) =>
	{
		gameSettings.stopAnim = true
	})
	document.addEventListener('pageChanged', (event) =>
	{
		gameSettings.stopAnim = true
	})
	document.addEventListener('keydown', e => {
		if (e.key === 'W' || e.key === 'w' || e.key === 'ArrowUp')
		{
			gameSettings.upPress = true
		}
		if (e.key === 'S' || e.key === 's' || e.key === 'ArrowDown')
		{
			gameSettings.downPress = true
		}
	})
	document.addEventListener('keyup', e => {
		if (e.key === 'W' || e.key === 'w' || e.key === 'ArrowUp')
		{
			gameSettings.upPress = false
		}
		if (e.key === 'S' || e.key === 's' || e.key === 'ArrowDown')
		{
			gameSettings.downPress = false
		}
	})
	window.addEventListener('resize', function() {
		resizeDuplicateCanvas(gameSettings)
	})
	duplicateLoop(gameSettings);
}

function resizeDuplicateCanvas(gameSettings)
{
	gameSettings.canvas.width = gameSettings.canvas.clientWidth;
	gameSettings.canvas.height = gameSettings.canvas.clientHeight;
	gameSettings.paddleWidth = 0.015 * gameSettings.canvas.width;
	gameSettings.paddleHeight = 0.3 * gameSettings.canvas.height;
	gameSettings.paddleBuffer = 0.02 * gameSettings.canvas.width;
	gameSettings.paddle1Y = (gameSettings.canvas.height - gameSettings.paddleHeight) * gameSettings.player1;
        gameSettings.paddle2Y = (gameSettings.canvas.height - gameSettings.paddleHeight) * gameSettings.player2;
	duplicateDraw(gameSettings)
}

function duplicateDraw(gameSettings)
{
	ctx = gameSettings.canvas.getContext('2d');
	ctx.clearRect(0, 0, gameSettings.canvas.width, gameSettings.canvas.height);
	ctx.fillStyle = 'white';
	gameSettings.paddle1Y = (gameSettings.canvas.height - gameSettings.paddleHeight) * gameSettings.player1;
        gameSettings.paddle2Y = (gameSettings.canvas.height - gameSettings.paddleHeight) * gameSettings.player2;
	ctx.setLineDash([15, 10]);
	ctx.beginPath();
	ctx.moveTo(gameSettings.canvas.width / 2, 0);
	ctx.lineTo(gameSettings.canvas.width / 2, gameSettings.canvas.height);
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 4;
	ctx.stroke();
	ctx.setLineDash([]);
	ctx.fillRect(gameSettings.canvas.width / 6, gameSettings.canvas.height / 2, gameSettings.canvas.width * 2/3, 2);
	ctx.fillRect(gameSettings.canvas.width / 6, gameSettings.canvas.height / 6, 2, gameSettings.canvas.height * 2/3);
	ctx.fillRect(5 * gameSettings.canvas.width / 6, gameSettings.canvas.height / 6, 2, gameSettings.canvas.height * 2/3);
	ctx.fillRect(0, gameSettings.canvas.height / 6, gameSettings.canvas.width, 2);
	ctx.fillRect(0, 5 * gameSettings.canvas.height / 6, gameSettings.canvas.width, 2);
	ctx.fillRect(gameSettings.paddleBuffer, gameSettings.paddle1Y, gameSettings.paddleWidth, gameSettings.paddleHeight);
	ctx.fillRect(gameSettings.canvas.width - gameSettings.paddleWidth - gameSettings.paddleBuffer, gameSettings.paddle2Y, gameSettings.paddleWidth, gameSettings.paddleHeight);
}

function duplicateLoop(gameSettings) {
	if (gameSettings.upPress === true && gameSettings.paddle1Y > 0)
	{
		gameSettings.player1 -= 0.03
		gameSettings.player2 -= 0.03
	}
	if (gameSettings.downPress === true && gameSettings.paddle1Y < gameSettings.canvas.height - gameSettings.paddleHeight)
	{
		gameSettings.player1 += 0.03
		gameSettings.player2 += 0.03
	}
	duplicateDraw(gameSettings);
	if (gameSettings.stopAnim !== true)
		requestAnimationFrame(() => duplicateLoop(gameSettings))
}
