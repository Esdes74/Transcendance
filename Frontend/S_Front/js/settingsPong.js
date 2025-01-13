function initAnimationSettings(myCanvas)
{		
	const gameSettings = {
		canvas: myCanvas,
		paddleWidth: 10,
		paddleHeight: 0,
		paddleBuffer: 0,

		paddle1Y: 0,
		paddle2Y: 0,
		player1: 0.5,
		player2: 0.5,

		stopAnim: false,
	};

	resizeLoginCanvas(gameSettings);
	let height = gameSettings.canvas.height;
	let width = gameSettings.canvas.width;
        gameSettings.player2 = gameSettings.paddle2Dest / height

	window.addEventListener('popstate', (event) =>
	{
		gameSettings.stopAnim = true
	})
	document.addEventListener('pageChanged', (event) =>
	{
		gameSettings.stopAnim = true
	})
}

function resizeLoginCanvas(gameSettings)
{
	gameSettings.canvas.width = gameSettings.canvas.clientWidth;
	gameSettings.canvas.height = gameSettings.canvas.clientHeight;
	gameSettings.paddleWidth = 0.015 * gameSettings.canvas.width;
	gameSettings.paddleHeight = 0.3 * gameSettings.canvas.height;
	gameSettings.paddleBuffer = 0.02 * gameSettings.canvas.width;
	gameSettings.paddle1Y = (gameSettings.canvas.height - gameSettings.paddleHeight) / 2;
	gameSettings.paddle2Y = gameSettings.paddle1Y;
	loginDraw(gameSettings);
}

function loginDraw(gameSettings)
{
	player1red = Math.random() * 255
	player1green = Math.random() * 255
	player1blue = Math.random() * 255
	player2red = Math.random() * 255
	player2green = Math.random() * 255
	player2blue = Math.random() * 255
	ctx = gameSettings.canvas.getContext('2d');
	ctx.clearRect(0, 0, gameSettings.canvas.width, gameSettings.canvas.height);
	ctx.fillStyle = 'white';
	
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
	ctx.fillStyle = `rgb(${player1red}, ${player1green}, ${player1blue})`
	ctx.fillRect(gameSettings.paddleBuffer, gameSettings.paddle1Y, gameSettings.paddleWidth, gameSettings.paddleHeight);
	ctx.fillStyle = `rgb(${player2red}, ${player2green}, ${player2blue})`
	ctx.fillRect(gameSettings.canvas.width - gameSettings.paddleWidth - gameSettings.paddleBuffer, gameSettings.paddle2Y, gameSettings.paddleWidth, gameSettings.paddleHeight);
	if (gameSettings.stopAnim === false)
		requestAnimationFrame(() => loginLoop(gameSettings))
}

async function loginLoop(gameSettings) {
	await new Promise(r => setTimeout(r, 1000));
	loginDraw(gameSettings);
}
