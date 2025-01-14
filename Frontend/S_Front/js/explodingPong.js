class Ball {
	constructor(PosX, PosY, SpeedX, SpeedY)
	{
		this.PosX = PosX
		this.PosY = PosY
		this.SpeedX = SpeedX
		this.SpeedY = SpeedY
	}
}

function initExplodingPong(myCanvas)
{		
	const gameSettings = {
		canvas: myCanvas,
		balls: [],
		ballRadius: 0,
		stopAnim: false,
	};

	gameSettings.balls.push(new Ball(0.5, 0.5, 0.008, 0.005))
	resizeExplodingCanvas(gameSettings);

	window.addEventListener('popstate', (event) =>
	{
		gameSettings.stopAnim = true
	})
	document.addEventListener('pageChanged', (event) =>
	{
		gameSettings.stopAnim = true
	})
}
	
function resizeExplodingCanvas(gameSettings)
{
	gameSettings.canvas.width = gameSettings.canvas.clientWidth;
	gameSettings.canvas.height = gameSettings.canvas.clientHeight;
	gameSettings.ballRadius = 0.012 * gameSettings.canvas.width;
	explodingDraw(gameSettings);
}

function explodingDraw(gameSettings)
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
	gameSettings.balls.forEach(ball => {
		ctx.beginPath()
		ctx.arc(ball.PosX * gameSettings.canvas.width, ball.PosY * gameSettings.canvas.height, gameSettings.ballRadius, 0, Math.PI * 2)
		ctx.fill()
	})
	if (gameSettings.stopAnim === false)
		requestAnimationFrame(() => explodingLoop(gameSettings))
}

function explodingLoop(gameSettings) {
	let randomX = Math.random()
	let randomY = Math.random()
	gameSettings.balls.forEach(ball => {
		ball.PosX += ball.SpeedX
		ball.PosY += ball.SpeedY
		if (ball.PosX > 1 || ball.PosX < 0)
		{
			ball.SpeedX *= -1
			if (gameSettings.balls.length < 10042)
				gameSettings.balls.push(new Ball(ball.PosX + ball.SpeedX, ball.PosY, ball.SpeedX * (0.5 + randomX), ball.SpeedY * (0.5 + randomY)))
		}
		if (ball.PosY > 1 || ball.PosY < 0)
		{
			ball.SpeedY *= -1
			if (gameSettings.balls.length < 10042)
				gameSettings.balls.push(new Ball(ball.PosX, ball.PosY + ball.SpeedY, ball.SpeedX * (0.5 + randomX), ball.SpeedY * (0.5 + randomY)))
		}
	})
	explodingDraw(gameSettings)
}
