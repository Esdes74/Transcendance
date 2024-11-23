function init404Pong()
{		
	const gameSettings = {
		canvas: document.getElementById('pongCanvas'),
		
		ballRadius: 8,		
		printBall: false,	
		ballX: 0,				
		ballY: 0,					

		ballSpeedX: 0.005,
		ballSpeedY: 0.004,
	};


		resizeIndexCanvas(gameSettings);
		gameSettings.ballX = 0.5;
		gameSettings.ballY = 0.5;

	window.addEventListener('resize', resizeIndexCanvas);
	gameSettings.printBall = true;

	indexGameLoop(gameSettings);
}
	
	
	
function resizeIndexCanvas(gameSettings)
{
	gameSettings.canvas.width = gameSettings.canvas.clientWidth;
	gameSettings.canvas.height = gameSettings.canvas.clientHeight;
	indexDraw(gameSettings);
}

function indexDraw(gameSettings)
{
	ctx = gameSettings.canvas.getContext('2d');
	ctx.clearRect(0, 0, gameSettings.canvas.width, gameSettings.canvas.height);
	ctx.fillStyle = 'white';

	ctx.font = "bold 32px Arial";
	ctx.fillText("404", gameSettings.canvas.width * gameSettings.ballX, gameSettings.canvas.height * gameSettings.ballY)
}

function indexGameLoop(gameSettings) {
    indexDraw(gameSettings);
    gameSettings.ballX += gameSettings.ballSpeedX;
    gameSettings.ballY += gameSettings.ballSpeedY;
    if (gameSettings.ballX <= 0)
    {
        gameSettings.ballSpeedX *= -1
    }
    if (gameSettings.ballX * gameSettings.canvas.width >= gameSettings.canvas.width - 55)
    {
	gameSettings.ballSpeedX *= -1
    }
    if (gameSettings.ballY * gameSettings.canvas.height <= 20 || gameSettings.ballY >= 1)
   	gameSettings.ballSpeedY *= -1 
  requestAnimationFrame(() => indexGameLoop(gameSettings));
}

init404Pong();
