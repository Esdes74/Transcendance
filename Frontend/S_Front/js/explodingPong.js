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

	let randomX = Math.random()
        let randomY = Math.random()
	let randomXDir = Math.random() > 0.5 ? 1 : -1
	let randomYDir = Math.random() > 0.5 ? 1 : -1
	gameSettings.balls.push(new Ball(0.5, 0.5, randomXDir * (randomX + 0.5) / 200, randomYDir * (randomY + 0.5) / 200))
	resizeExplodingCanvas(gameSettings);
	window.addEventListener('popstate', (event) =>
	{
		gameSettings.stopAnim = true
	})
	document.addEventListener('pageChanged', (event) =>
	{
		gameSettings.stopAnim = true
	})
	window.addEventListener('resize', function() {
		resizeExplodingCanvas(gameSettings)
	})
	explodingLoop(gameSettings)
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
}

function explodingLoop(gameSettings) {
	let randomX = Math.random()
	let randomY = Math.random()
	gameSettings.balls.forEach(ball => {
		ball.PosX += ball.SpeedX
		ball.PosY += ball.SpeedY
		if (ball.PosX > 1 || ball.PosX < 0)
		{
			startPosX = ball.PosX > 1 ? 0.99 : 0.01
			ball.SpeedX *= -1
			if (gameSettings.balls.length < 10042)
				gameSettings.balls.push(new Ball(startPosX, ball.PosY, ball.SpeedX * (0.5 + randomX), ball.SpeedY * (0.5 + randomY)))
		}
		if (ball.PosY > 1 || ball.PosY < 0)
		{
			startPosY = ball.PosY > 1 ? 0.99 : 0.01
			ball.SpeedY *= -1
			if (gameSettings.balls.length < 10042)
				gameSettings.balls.push(new Ball(ball.PosX, startPosY, ball.SpeedX * (0.5 + randomX), ball.SpeedY * (0.5 + randomY)))
		}
	})
	explodingDraw(gameSettings)
	if (gameSettings.stopAnim === false)
		requestAnimationFrame(() => explodingLoop(gameSettings))
}
