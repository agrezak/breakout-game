var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var xPos = canvas.width/2;
var yPos = canvas.height-20;
var xMove = 2;
var yMove = -2;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleLeft = false;
var paddleRight = false;

document.addEventListener('keydown', keyLeft, false);
document.addEventListener('keyup', keyRight, false);

function keyLeft(e) {
    if(e.keyCode == 39) {
        paddleRight = true;
    }
    else if (e.keyCode == 37) {
        paddleLeft = true;
    }
}

function keyRight(e) {
    if(e.keyCode == 39) {
        paddleRight = false;
    }
    else if (e.keyCode === 37) {
        paddleLeft = false;
    }
}

function ball() {
    ctx.beginPath();
    ctx.arc(xPos, yPos, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#f1c40f";
    ctx.fill();
    ctx.closePath();
}

function paddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath()
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball();
    paddle();
    if(xPos + xMove > canvas.width-ballRadius || xPos + xMove < ballRadius) {
        xMove = -xMove;
    }
    if(yPos + yMove > canvas.height-ballRadius || yPos + yMove < ballRadius) {
        yMove = -yMove;
    }
    if(paddleRight && paddleX < canvas.width-paddleWidth) {
        paddleX += 5;
    }
    else if(paddleLeft && paddleX > 0) {
        paddleX -= 5;
    }
    xPos += xMove;
    yPos += yMove;
}

function randomColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

setInterval(draw, 5);
