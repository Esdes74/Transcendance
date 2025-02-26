function init404Pong()
{
	const gameSettings = {
		canvas: document.getElementById('404Canvas'),
		
		textX: 0.5,				
		textY: 0.5,

		textSpeedX: 0.005,
		textSpeedY: 0.004,
		
		stopAnim: false
	};
	window.addEventListener('popstate', (event) =>
	{
		gameSettings.stopAnim = true
	})
	document.addEventListener('pageChanged', (event) =>
	{
		gameSettings.stopAnim = true
	})
	resize404Canvas(gameSettings);
	loop404(gameSettings);
}
	
function resize404Canvas(gameSettings)
{
	gameSettings.canvas.width = gameSettings.canvas.clientWidth;
	gameSettings.canvas.height = gameSettings.canvas.clientHeight;
	draw404(gameSettings);
}

function draw404(gameSettings)
{
	let ctx = gameSettings.canvas.getContext('2d');
	ctx.clearRect(0, 0, gameSettings.canvas.width, gameSettings.canvas.height);
	ctx.fillStyle = 'white';

	ctx.font = "bold 32px Arial";
	ctx.fillText("404", gameSettings.canvas.width * gameSettings.textX, gameSettings.canvas.height * gameSettings.textY)
}

function loop404(gameSettings) {
	draw404(gameSettings);
	gameSettings.textX += gameSettings.textSpeedX;
	gameSettings.textY += gameSettings.textSpeedY;
	if (gameSettings.textX <= 0)
		gameSettings.textSpeedX *= -1
	if (gameSettings.textX * gameSettings.canvas.width >= gameSettings.canvas.width - 55)
		gameSettings.textSpeedX *= -1
	if (gameSettings.textY * gameSettings.canvas.height <= 20 || gameSettings.textY >= 1)
	gameSettings.textSpeedY *= -1 
	if (gameSettings.stopAnim === false)
		requestAnimationFrame(() => loop404(gameSettings));
}
