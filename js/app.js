// --- Variables ---

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// X, Y position and size of ball

var xPos = canvas.width/2;
var yPos = canvas.height-20;
var xMove = 3;
var yMove = -3;
var ballRadius = 10;

// Paddle size and position

var paddleHeight = 10;
var paddleWidth = 90;
var paddleX = (canvas.width-paddleWidth)/2;
var paddleLeft = false;
var paddleRight = false;
var offset = 10;

// Bricks

var brickRows = 7;
var brickColumns = 5;
var brickWidth = 50;
var brickHeight = 25;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 200;

// Uncategorized variables

var score = 0;

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

// Bricks array

var bricks = [];
for(c=0; c<brickColumns; c++) {
    bricks[c] = [];
    for(r=0; r<brickRows; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Function that creates scorebar and shows your current score (+1 for destroying a brick)

function scorebar() {
    ctx.font = "14px Arial";
    ctx.fillStyle = "#1abc9c";
    ctx.fillText("Your score = "+score, 10, 15);
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
    ctx.rect(paddleX, canvas.height-paddleHeight-offset, paddleWidth, paddleHeight);
    ctx.fillStyle = "#3498db";
    ctx.fill();
    ctx.closePath()
}

// Function that creates bricks

function createBricks() {
    for(c=0; c<brickColumns; c++) {
        for(r=0; r<brickRows; r++) {
            if(bricks[c][r].status ==1) {
                var brickXpos = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickYpos = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickXpos;
                bricks[c][r].y = brickYpos;
                ctx.beginPath();
                ctx.rect(brickXpos, brickYpos, brickWidth, brickHeight);
                ctx.fillStyle = "#e74c3c";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Function that detects collision with brick

function bricksCollision() {
    for(c=0; c<brickColumns; c++) {
        for(r=0; r<brickRows; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(xPos > b.x && xPos < b.x+brickWidth && yPos > b.y && yPos < b.y+brickHeight) {
                    yMove = -yMove;
                    b.status = 0;
                    score++;
                }
            }
        }
    }
}

// Function that controls the paddle and ball behaviour/movement

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createBricks();
    ball();
    paddle();
    bricksCollision();
    scorebar();

    if(xPos + xMove > canvas.width-ballRadius || xPos + xMove < ballRadius) {
        xMove = -xMove;
    }
    if(yPos + yMove < ballRadius) {
        yMove = -yMove;
    }
    else if (yPos + yMove > canvas.height-ballRadius-offset) {
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
