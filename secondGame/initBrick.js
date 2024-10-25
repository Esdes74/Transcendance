let ball = {
xPos: 0,
yPos: -500,
xDir: 1.5,
yDir: 1,
speed: 10,
ray: 10,
set: true
}

let ball2 = {
xPos: 0,
yPos: -500,
xDir: 1.5,
yDir: 1,
speed: 10,
ray: 10,
set: false
}

let leftPaddle = {
xPos: 0,
yPos: -515,
length: 80,
heigth: 10,
speed: 10
}

let powerUp = {
xPos: 0,
yPos: 150,
length: 40,
heigth: 40,
}

const coord = class {
	constructor(xPos, yPos){
		this.xPos = xPos
		this.yPos = yPos
	}
}

let briks = [new coord(-375, 200)]

let coY = 200
let coX = -375
while (coY < 600)
{
	coX = -375
	while (coX < 360)
	{
		briks.push(new coord(coX, coY))
		coX += 50
	}
	coY += 60
} 


/*
let rightPaddle = {
xPos: 550,
yPos: 0,
length: 10,
heigth: 80,
speed: 10
}*/

console.log(ball)
