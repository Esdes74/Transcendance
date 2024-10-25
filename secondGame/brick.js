function getCanvasContexte()
{
	return (document.getElementById("myFirstCanvas").getContext("2d"))
}
/*
function calculateNewDir(ball, paddle)
{
	
}
*/
function drawBall(ballTmp)
{
	if (ballTmp.set === false)
		return
	let contexte = getCanvasContexte()
	contexte.beginPath()
	contexte.arc(ballTmp.xPos + 400, -ballTmp.yPos + 600, ballTmp.ray, 0, 2 * Math.PI)
	contexte.fillStyle = "rgba(255,255,255,1)"
	contexte.fill()
}

function drawLeftPaddle()
{
	let contexte = getCanvasContexte()
	contexte.fillStyle = "rgba(255,0,0,1)"
	contexte.fillRect(leftPaddle.xPos + 400 - leftPaddle.length / 2, -leftPaddle.yPos - leftPaddle.heigth / 2 + 600, leftPaddle.length, leftPaddle.heigth)
}

function drawBricks()
{
	let contexte = getCanvasContexte()
	contexte.fillStyle = "rgba(100,100,245,1)"
	for (i = 0; i < briks.length; i++)
	{
		contexte.fillRect(briks[i].xPos + 400, -briks[i].yPos + 600, 40, 20)
	}
}

function drawPowerUp()
{
	let contexte = getCanvasContexte()
	contexte.fillStyle = "rgba(100,255,255,1)"
	contexte.fillRect(powerUp.xPos + 400 - powerUp.length / 2, -powerUp.yPos - powerUp.heigth / 2 + 600, powerUp.length, powerUp.heigth)
}
/*
function drawRightPaddle()
{
	let contexte = getCanvasContexte()
	contexte.fillStyle = "rgba(255,255,0,1)"
	contexte.fillRect(rightPaddle.xPos + 600, -rightPaddle.yPos - rightPaddle.heigth / 2 + 400, rightPaddle.length, rightPaddle.heigth)
}
*/
function drawBoard()
{
	let contexte = getCanvasContexte()
	contexte.fillStyle = "rgba(0,0,0,1)"
	contexte.fillRect(0, 0, 800, 1200)
}
/*
function ballInterRightPaddle()
{
	if (ball.xPos >= rightPaddle.xPos - rightPaddle.length && ball.yPos <= rightPaddle.yPos + rightPaddle.heigth / 2 && ball.yPos >= rightPaddle.yPos - rightPaddle.heigth / 2)
	{
		ball.xDir *= -1
		return (true)
	}
	return (false)
}
*/
function ballInterLeftPaddle(ballTmp)
{
/*	if (ball.xPos <= leftPaddle.xPos + leftPaddle.length && ball.yPos <= leftPaddle.yPos + leftPaddle.heigth / 2 && ball.yPos >= leftPaddle.yPos - leftPaddle.heigth / 2)
	{
		ball.xDir *= -1
		return (true)
	}*/
	if (ballTmp.set === false)
		return
	if (ballTmp.yPos <= leftPaddle.yPos + leftPaddle.heigth / 2 + ballTmp.ray && ball.yPos >= leftPaddle.yPos - leftPaddle.heigth / 2 - ballTmp.ray && ballTmp.xPos <= leftPaddle.xPos + leftPaddle.length / 2 + ballTmp.ray
			&& ballTmp.xPos >= leftPaddle.xPos - leftPaddle.length / 2 - ballTmp.ray)
	{
		ballTmp.yDir *= -1
		return (true)
	}
	return (false)
}

function ballInterBoarder(ballTmp)
{
	if (ballTmp.set === false)
		return
	if (ballTmp.xPos <= -400 || ballTmp.xPos >= 400)
	{
		ballTmp.xDir *= -1
		return (true)
	}
	if (ballTmp.yPos <= -600 || ballTmp.yPos >= 600)
	{
		ballTmp.yDir *= -1
		return (true)
	}
	return (false)
}

function ballInterBriks(ballTmp)
{
	if (ballTmp.set === false)
		return
	let tmp = false
	for (i = 0; i < briks.length; i++)
	{
		if (ballTmp.yPos >= briks[i].yPos - 20 - ballTmp.ray && ballTmp.yPos <= briks[i].yPos + ballTmp.ray
			&& ballTmp.xPos <= briks[i].xPos + 40 + ballTmp.ray && ballTmp.xPos >= briks[i].xPos - ballTmp.ray)
		{
			tmp = true
			let spliced = briks.splice(i, 1)
			i--
		}
	}
	if (tmp === true)
		ballTmp.yDir *= -1
}

function ballInterPowerUp(ballTmp)
{
	if (ballTmp.yPos >= powerUp.yPos - 20 - ballTmp.ray && ballTmp.yPos <= powerUp.yPos + 20 + ballTmp.ray
		&& ballTmp.xPos <= powerUp.xPos + 20 + ballTmp.ray && ballTmp.xPos >= powerUp.xPos - 20 - ballTmp.ray)
	{
		powerUp.xPos = -1000
		powerUp.yPos = -1000
		ballTmp.yDir *= -1
		return (true)
	}
	return (false)
}

function drawGame()
{
	requestAnimationFrame(drawGame)
	ball.yPos += ball.yDir * ball.speed / 2
	ball.xPos += ball.xDir * ball.speed / 2
	ball2.yPos += ball2.yDir * ball2.speed / 2
	ball2.xPos += ball2.xDir * ball2.speed / 2
	let contexte = getCanvasContexte()
	contexte.clearRect(0, 0, 800, 1200)
	drawBoard()
	drawBricks()
	drawBall(ball)
	drawBall(ball2)
	drawPowerUp()
	drawLeftPaddle()
//	drawRightPaddle()
	if (ballInterPowerUp(ball))
	{
		ball2.set = true
		ball2.xPos = ball.xPos
		ball2.yPos = ball.yPos
		ball2.xDir = -ball.xDir
		ball2.yDir = ball.yDir
		ball2.speed = ball.speed
	}
	ballInterLeftPaddle(ball)
	ballInterLeftPaddle(ball2)
	ballInterBriks(ball)
	ballInterBriks(ball2)
	ballInterBoarder(ball)
	ballInterBoarder(ball2)
//	ballInterRightPaddle()
}

requestAnimationFrame(drawGame)

document.addEventListener('keydown', (event) => {
	console.log(event.which)
	if (event.which === 38)
	{
		leftPaddle.xPos += leftPaddle.speed
	}
	else if (event.which === 40)
	{
		leftPaddle.xPos -= leftPaddle.speed
	}
	else if (event.which === 37)
	{
		leftPaddle.xPos -= leftPaddle.speed
	}
	else if (event.which === 39)
	{
		leftPaddle.xPos += leftPaddle.speed
	}
}
)
