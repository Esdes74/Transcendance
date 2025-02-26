function initDeniedPong()
{
	const gameSettings = {
		canvas: document.getElementById('DeniedCanvas'),
		
		textX: -0.04,
		textY: 0.04,
		stopAnim: false,
	};

	resizeDeniedCanvas(gameSettings);
	let ctx = gameSettings.canvas.getContext('2d');
        ctx.translate(gameSettings.canvas.clientWidth / 2, gameSettings.canvas.clientHeight / 5)
	window.addEventListener('popstate', (event) =>
	{
		gameSettings.stopAnim = true
	})
	document.addEventListener('pageChanged', (event) =>
	{
		gameSettings.stopAnim = true
	})
	loopDenied(gameSettings);
}
	
function resizeDeniedCanvas(gameSettings)
{
	gameSettings.canvas.width = gameSettings.canvas.clientWidth;
	gameSettings.canvas.height = gameSettings.canvas.clientHeight;
}

function drawDenied(gameSettings)
{
	let ctx = gameSettings.canvas.getContext('2d');
	ctx.clearRect(-gameSettings.canvas.width / 2, -gameSettings.canvas.height / 2, gameSettings.canvas.width, gameSettings.canvas.height);
	ctx.fillStyle = 'white';

	ctx.font = "bold 100px Arial";
	ctx.rotate((0.05))
	ctx.fillText("?", gameSettings.canvas.width * gameSettings.textX, gameSettings.canvas.height * gameSettings.textY)
}

function loopDenied(gameSettings) {
	drawDenied(gameSettings);
	if (gameSettings.stopAnim === false)
		requestAnimationFrame(() => loopDenied(gameSettings));
}
