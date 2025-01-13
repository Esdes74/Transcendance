function loadAnimationLogin(myCanvas)
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
		goRight: true,	

		stopAnim: false,
	};

	resizeLoginCanvas(gameSettings);
	gameSettings.printBall = true;
	let height = gameSettings.canvas.height;
	let width = gameSettings.canvas.width;
        gameSettings.player2 = gameSettings.paddle2Dest / height
        gameSettings.paddle2Dest -= gameSettings.paddleHeight / 2
	window.addEventListener('popstate', (event) =>
	{
		gameSettings.stopAnim = true
	})
	document.addEventListener('pageChanged', (event) =>
	{
		gameSettings.stopAnim = true
	})
	loginLoop(gameSettings);
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
}

async function loginDraw(gameSettings)
{
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
	ctx.fillRect(gameSettings.paddleBuffer, gameSettings.paddle1Y, gameSettings.paddleWidth, gameSettings.paddleHeight);
	ctx.fillRect(gameSettings.canvas.width - gameSettings.paddleWidth - gameSettings.paddleBuffer, gameSettings.paddle2Y, gameSettings.paddleWidth, gameSettings.paddleHeight);
	if (gameSettings.goRight === true)
	{
		tmpBallPosX = 0.05
		while (tmpBallPosX < gameSettings.ballPosX)
		{
			ctx.beginPath();
			ctx.arc(tmpBallPosX * gameSettings.canvas.width, 0.5 * gameSettings.canvas.height, 0.012 * gameSettings.canvas.width, 0, Math.PI * 2);
			ctx.fill();
			tmpBallPosX += 0.1
		}
		await new Promise(r => setTimeout(r, 250))
		if (gameSettings.stopAnim === false)
			requestAnimationFrame(() => loginLoop(gameSettings))
	}
	else
	{
		tmpBallPosX = 0.95
		while (tmpBallPosX > gameSettings.ballPosX)
		{
			ctx.beginPath();
			ctx.arc(tmpBallPosX * gameSettings.canvas.width, 0.5 * gameSettings.canvas.height, 0.012 * gameSettings.canvas.width, 0, Math.PI * 2);
			ctx.fill();
			tmpBallPosX -= 0.1
		}
		await new Promise(r => setTimeout(r, 250))
		if (gameSettings.stopAnim === false)
			requestAnimationFrame(() => loginLoop(gameSettings))
	}
}

function loginLoop(gameSettings) {
	if (gameSettings.ballPosX > 1)
	{
		gameSettings.goRight = false
		gameSettings.ballPosX = 0.9488
	}
	else if (gameSettings.ballPosX < 0)
	{
		gameSettings.goRight = true
		gameSettings.ballPosX = 0.0512
	}
	else
		gameSettings.ballPosX += (gameSettings.goRight ? 1 : -1) * 0.05
	loginDraw(gameSettings);
}
