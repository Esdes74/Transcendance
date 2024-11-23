function errorLink()
{
	history.pushState({pageID: ''}, '', '/');
	rootMyUrl();
}

function init404Pong()
{		
	const gameSettings = {
		canvas: document.getElementById('pongCanvas'),
		
		ballRadius: 8,		
		printBall: true,	
		ballX: 0.5,				
		ballY: 0.5,

		ballSpeedX: 0.005,
		ballSpeedY: 0.004,
	};


	resizeIndexCanvas(gameSettings);

	window.addEventListener('resize', resizeIndexCanvas);
	const button = document.getElementById("404index");
	button.addEventListener("click", errorLink);
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
