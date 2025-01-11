function initAnimation(myCanvas)
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

		paddle1Dest: -1000,
		paddle2Dest: -1000,
		
		ballRadius: 0,
		printBall: false,	
		ballX: 0.5,
		ballY: 0.5,					

		ballSpeedX: 0.012,
		ballSpeedY: 0.012,
		
		stopAnim: false,
	};

	resizeIndexCanvas(gameSettings);
	gameSettings.printBall = true;
	let height = gameSettings.canvas.height;
	let width = gameSettings.canvas.width;
	gameSettings.paddle1Dest = height * 0.5 - gameSettings.paddleHeight / 2
	gameSettings.paddle2Dest = calculatePaddlePos(gameSettings.ballX * width, gameSettings.ballY * height, gameSettings.ballSpeedX * width, gameSettings.ballSpeedY * height, 2, width, height, gameSettings.paddleHeight)
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
	indexGameLoop(gameSettings);
}
	
	
	
function resizeIndexCanvas(gameSettings)
{
	gameSettings.canvas.width = gameSettings.canvas.clientWidth;
	gameSettings.canvas.height = gameSettings.canvas.clientHeight;
	gameSettings.paddleWidth = 0.015 * gameSettings.canvas.width;
	gameSettings.ballRadius = 0.012 * gameSettings.canvas.width;
	gameSettings.paddleHeight = 0.3 * gameSettings.canvas.height;
	gameSettings.paddleBuffer = 0.02 * gameSettings.canvas.width;
	gameSettings.paddle1Y = (gameSettings.canvas.height - gameSettings.paddleHeight) / 2;
	gameSettings.paddle2Y = gameSettings.paddle1Y;
	indexDraw(gameSettings);
}

function indexDraw(gameSettings)
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
	ctx.beginPath();
	ctx.arc(gameSettings.ballX * gameSettings.canvas.width, gameSettings.ballY * gameSettings.canvas.height, gameSettings.ballRadius, 0, Math.PI * 2);
	ctx.fill();
}

function indexGameLoop(gameSettings) {
	indexDraw(gameSettings);
	gameSettings.ballX += gameSettings.ballSpeedX;
	gameSettings.ballY += gameSettings.ballSpeedY;
	if (gameSettings.ballX <= 0.05)
	{
		gameSettings.ballSpeedX *= -1
		gameSettings.ballSpeedY = (gameSettings.ballY - gameSettings.player1) * 0.08
		gameSettings.paddle1Dest = gameSettings.canvas.height * 0.5 - gameSettings.paddleHeight / 2
	gameSettings.paddle2Dest = calculatePaddlePos(gameSettings.ballX * gameSettings.canvas.width, gameSettings.ballY * gameSettings.canvas.height, gameSettings.ballSpeedX * gameSettings.canvas.width, gameSettings.ballSpeedY * gameSettings.canvas.height, 2, gameSettings.canvas.width, gameSettings.canvas.height, gameSettings.paddleHeight)
	gameSettings.player2 = gameSettings.paddle2Dest / gameSettings.canvas.height
	gameSettings.paddle2Dest -= gameSettings.paddleHeight / 2
	}
	if (gameSettings.ballX >= 0.95)
	{
	gameSettings.ballSpeedX *= -1
		gameSettings.ballSpeedY = (gameSettings.ballY - gameSettings.player2) * 0.08
	gameSettings.paddle2Dest = gameSettings.canvas.height * 0.5 - gameSettings.paddleHeight / 2
	gameSettings.paddle1Dest = calculatePaddlePos(gameSettings.ballX * gameSettings.canvas.width, gameSettings.ballY * gameSettings.canvas.height, gameSettings.ballSpeedX * gameSettings.canvas.width, gameSettings.ballSpeedY * gameSettings.canvas.height, 1, gameSettings.canvas.width, gameSettings.canvas.height, gameSettings.paddleHeight)
	gameSettings.player1 = gameSettings.paddle1Dest / gameSettings.canvas.height
	gameSettings.paddle1Dest -= gameSettings.paddleHeight / 2
	}
	if (gameSettings.ballY <= 0.008 || gameSettings.ballY >= 0.99)
	gameSettings.ballSpeedY *= -1
	if (gameSettings.paddle1Dest >= -1000 && gameSettings.paddle1Y < gameSettings.paddle1Dest)
	{
	gameSettings.paddle1Y += 0.012 * gameSettings.canvas.height
	if (gameSettings.paddle1Y > gameSettings.paddle1Dest)
		gameSettings.paddle1Y = gameSettings.paddle1Dest
	}
	else if (gameSettings.paddle1Dest >= -1000 && gameSettings.paddle1Y > gameSettings.paddle1Dest)
	{
	gameSettings.paddle1Y -= 0.012 * gameSettings.canvas.height
	if (gameSettings.paddle1Y < gameSettings.paddle1Dest)
		gameSettings.paddle1Y = gameSettings.paddle1Dest
	}
	if (gameSettings.paddle2Dest >= -1000 && gameSettings.paddle2Y < gameSettings.paddle2Dest)
	{
	gameSettings.paddle2Y += 0.012 * gameSettings.canvas.height
	if (gameSettings.paddle2Y > gameSettings.paddle2Dest)
		gameSettings.paddle2Y = gameSettings.paddle2Dest
	}
	else if (gameSettings.paddle2Dest >= -1000 && gameSettings.paddle2Y > gameSettings.paddle2Dest)
	{
	gameSettings.paddle2Y -= 0.012 * gameSettings.canvas.height
	if (gameSettings.paddle2Y < gameSettings.paddle2Dest)
		gameSettings.paddle2Y = gameSettings.paddle2Dest
	}

	if (gameSettings.stopAnim === false)
		requestAnimationFrame(() => indexGameLoop(gameSettings));
}

function calculatePaddlePos(ballX, ballY, ballSpeedX, ballSpeedY, paddle, width, height, paddleHeight)
{
	paddleHeight = 0.3 * height
	let value = interTop(ballX, ballY, ballSpeedX, ballSpeedY, width, height)
	if (value !== -1)
	{
		if (value === 0 || value === width)
			return (8 + 0.15 * height)
		return (calculatePaddlePos(value, 8, ballSpeedX, -ballSpeedY, paddle, width, height))
	}
	let value1 = interBot(ballX, ballY, ballSpeedX, ballSpeedY, width, height)
	if (value1 !== -1)
	{
		if (value1 === 0 || value1 === width)
			return (height - 0.15 * height - 8)
		return (calculatePaddlePos(value1, height - 8, ballSpeedX, -ballSpeedY, paddle, width, height))
	}
	let value2 = interPaddle1(ballX, ballY, ballSpeedX, ballSpeedY, width, height)
	if (value2 !== -1 && paddle === 1)
		return (randomizeResult(value2, paddleHeight, height))
	let value3 = interPaddle2(ballX, ballY, ballSpeedX, ballSpeedY, width, height)
	if (value3 !== -1 && paddle === 2)
		return (randomizeResult(value3, paddleHeight, height))
	return (0.5 * height)
}

function interTop(ballX, ballY, ballSpeedX, ballSpeedY, width, height)
{	
	if (ballSpeedY >= 0)
		return (-1)
	let interX = (ballSpeedX * -ballY) / ballSpeedY + ballX
	if (interX >= 0 && interX <= width)
	{
		if (interX >= 0 && interX <= 0.1 * width && ballSpeedX < 0)
			return (0)
		if (interX <= width && interX >= 0.9 * width && ballSpeedX > 0)
			return (width)
		return (interX)	
	}
	return (-1)
}

function interBot(ballX, ballY, ballSpeedX, ballSpeedY, width, height)
{
	if (ballSpeedY <= 0)
		return (-1)
	let interX = (ballSpeedX * (height - ballY)) / ballSpeedY + ballX
	if (interX >= 0 && interX <= width)
	{
		if (interX >= 0 && interX <= 0.1 * width && ballSpeedX < 0)
			return (0)
		if (interX <= width && interX >= 0.9 * width && ballSpeedX > 0)
			return (width)
		return (interX)	
	}
	return (-1)
}

function interPaddle1(ballX, ballY, ballSpeedX, ballSpeedY, width, height)
{
	if (ballSpeedX >= 0)
		return (-1)
	let interY = (ballSpeedY * (0.05 * width + 8 - ballX)) / ballSpeedX + ballY
	if (interY >= height - 8 - 0.15 * height)
		return (height - 8 - 0.15 * height)
	if (interY <= 8 + 0.15 * height)
		return (8 + 0.15 * height)
	return (interY)
}

function interPaddle2(ballX, ballY, ballSpeedX, ballSpeedY, width, height)
{
	if (ballSpeedX <= 0)
		return (-1)
	let interY = (ballSpeedY * (0.95 * width - 8 - ballX)) / ballSpeedX + ballY
	if (interY >= height - 8 - 0.15 * height)
		return (height - 8 - 0.15 * height)
	if (interY <= 8 + 0.15 * height)
		return (8 + 0.15 * height)
	return (interY)
}

function randomizeResult(result, paddleHeight, height)
{
	let random = Math.random()
	if (result === 8 + 0.15 * height || result === height - 8 - 0.15 * height)
		return (result + 4 * random - 2)
	let value = (paddleHeight - 40) * random - ((paddleHeight - 40) / 2)
	if (value + result < 8 + 0.15 * height || value + result > height - 8 - 0.15 * height)
		return (result)
	return (value + result)
}
