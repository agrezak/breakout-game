// Variables

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var xPos = canvas.width/2;
var yPos = canvas.height-20;
var xMove = 3;
var yMove = -3;
var ballRadius = 10;

var paddleHeight = 10;
var paddleWidth = 90;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleLeft = false;
var paddleRight = false;

// End of variables

// Event listeners

document.addEventListener('keydown', pressed, false);
document.addEventListener('keyup', notPressed, false);

// End of event listeners

// Function that is changing value of variable when key is pressed

function pressed(e) {
    if(e.keyCode == 39) {
        paddleRight = true;
    }
    else if (e.keyCode == 37) {
        paddleLeft = true;
    }
}

// Function that is changing value of variable when key is let go


function notPressed(e) {
    if(e.keyCode == 39) {
        paddleRight = false;
    }
    else if (e.keyCode === 37) {
        paddleLeft = false;
    }
}

// Function that creates the ball

function ball() {
    ctx.beginPath();
    ctx.arc(xPos, yPos, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#f1c40f";
    ctx.fill();
    ctx.closePath();
}

// Function that creates the paddle

function paddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#3498db";
    ctx.fill();
    ctx.closePath()
}

// Function that controls the paddle and ball behaviour/movement

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball();
    paddle();

    if(xPos + xMove > canvas.width-ballRadius || xPos + xMove < ballRadius) {
        xMove = -xMove;
    }
    if(yPos + yMove < ballRadius) {
        yMove = -yMove;
    }
    else if (yPos + yMove > canvas.height-ballRadius) {
        if (xPos > paddleX && xPos < paddleX + paddleWidth) {
            yMove = -yMove;
        }
        else {
            alert("Game over, try again!");
            document.location.reload();
        }
    }
    if(paddleRight && paddleX < canvas.width-paddleWidth) {
        paddleX += 7.5;
    }
    else if(paddleLeft && paddleX > 0) {
        paddleX -= 7.5;
    }
    xPos += xMove;
    yPos += yMove;
}

// Function that returns random color

function randomColor() {
    var r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

setInterval(draw, 12.5);
