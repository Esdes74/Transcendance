function getCanvasContexte()
{
	return (document.getElementById("myFirstCanvas").getContext("2d"))
}

function drawBall()
{
	let contexte = getCanvasContexte()
	contexte.beginPath()
	contexte.arc(ball.xPos + 600, -ball.yPos + 400, 10, 0, 2 * Math.PI)
	contexte.fillStyle = "rgba(255,255,255,1)"
	contexte.fill()
}

function drawLeftPaddle()
{
	let contexte = getCanvasContexte()
	contexte.fillStyle = "rgba(255,0,0,1)"
	contexte.fillRect(leftPaddle.xPos + 600, -leftPaddle.yPos - leftPaddle.heigth / 2 + 400, leftPaddle.length, rightPaddle.heigth)
}

function drawRightPaddle()
{
	let contexte = getCanvasContexte()
	contexte.fillStyle = "rgba(255,255,0,1)"
	contexte.fillRect(rightPaddle.xPos + 600, -rightPaddle.yPos - rightPaddle.heigth / 2 + 400, rightPaddle.length, rightPaddle.heigth)
}

function drawBoard()
{
	let contexte = getCanvasContexte()
	contexte.fillStyle = "rgba(0,0,0,1)"
	contexte.fillRect(0, 0, 1200, 800)
}

function ballInterRightPaddle()
{
	if (ball.xPos >= rightPaddle.xPos - rightPaddle.length && ball.yPos <= rightPaddle.yPos + rightPaddle.heigth / 2 && ball.yPos >= rightPaddle.yPos - rightPaddle.heigth / 2)
	{
		ball.xDir *= -1
		return (true)
	}
	return (false)
}

function ballInterLeftPaddle()
{
	if (ball.xPos <= leftPaddle.xPos + leftPaddle.length && ball.yPos <= leftPaddle.yPos + leftPaddle.heigth / 2 && ball.yPos >= leftPaddle.yPos - leftPaddle.heigth / 2)
	{
		ball.xDir *= -1
		return (true)
	}
	return (false)
}

function ballInterBoarder()
{
	if (ball.xPos <= -600 || ball.xPos >= 600)
		return (true)
	return (false)
}

function drawGame()
{
	requestAnimationFrame(drawGame)
	ball.xPos += ball.xDir * ball.speed
	let contexte = getCanvasContexte()
	contexte.clearRect(0, 0, 1200, 800)
	drawBoard()
	drawBall()
	drawLeftPaddle()
	drawRightPaddle()
	ballInterLeftPaddle()
	ballInterRightPaddle()
}

requestAnimationFrame(drawGame)

document.addEventListener('keydown', (event) => {
	if (event.which === 38)
	{
		leftPaddle.yPos += leftPaddle.speed
	}
	else if (event.which === 40)
	{
		leftPaddle.yPos -= leftPaddle.speed
	}
	else if (event.which === 37)
	{
		rightPaddle.yPos += rightPaddle.speed
	}
	else if (event.which === 39)
	{
		rightPaddle.yPos -= rightPaddle.speed
	}
})
