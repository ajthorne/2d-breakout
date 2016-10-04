let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

//globally stored variables
let score = 0;
let lives = 3;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 7.5;
let paddleHeight = 13;
let paddleWidth = 70;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = (canvas.height - 10);
// ^ defines where the paddle begins on x-axis

//brick variables
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 80;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = {
            x: 0,
            y: 0,
            status: 1
        };
    }
}

let leftPress = false;
let rightPress = false;
//key presses for event listeners

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPress = true;
    } else if (e.keyCode == 37) {
        leftPress = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPress = false;
    } else if (e.keyCode == 37) {
        leftPress = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight+25) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score === brickRowCount*brickColumnCount) {
                    alert("YOU WIN, CONGRATULATIONS!");
                    document.location.reload();
                }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "1.2rem Helvetica";
    ctx.fillStyle = "limegreen";
    ctx.fillText("Score: "+score, 8, 22);
}

function drawLives() {
    ctx.font = "1.2rem Helvetica";
    ctx.fillStyle = "limegreen";
    ctx.fillText("Lives: "+lives, canvas.width-75, 22);
}

function drawTitle() {
    // ctx.shadowColor = "black";
    // ctx.shadowOffsetX = 2;
    // ctx.shadowOffsetY = 2;
    // ctx.shadowBlur = 5;
    let text = "2D Breakout"
    ctx.font = "1.8rem Helvetica";
    ctx.fillStyle = "gray";
    ctx.fillText(text, 177, 30);
    ctx.fillStyle = "limegreen";
    ctx.fillText(text, 175, 28);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 10, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#70777A";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#70777A";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY + 15, brickWidth, brickHeight);
                ctx.fillStyle = "#70777A";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    drawLives();
    drawTitle();
    x += dx;
    y += dy;

    if (y + dy < ballRadius) {
        //if ball position is greater than the height of the canvas, reverse y axis movement
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            //if ball is on x-axis where the paddle is
            dy = -dy;
        } else {
          lives--;
          if(!lives) {
              alert("YOU'RE KILLING ME SMALLS");
              document.location.reload();
          }
          else {
              x = canvas.width/2;
              y = canvas.height-30;
              dx = 2;
              dy = -2;
              paddleX = (canvas.width-paddleWidth)/2;
          }
        }
    }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        //if ball position is greater than the width of the canvas, reverse x axis movement
        dx = -dx;
    }

    if (rightPress && paddleX < canvas.width - paddleWidth) {
        paddleX += 6;
    } else if (leftPress && paddleX > 0) {
        paddleX -= 6;
    }
    requestAnimationFrame(draw);
    //gives control of framerate to browser rather than a static setinterval
}
draw();
// setInterval(draw, 10);
//set interval redraws the ball so that it appears to be moving


//code developed with help of https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/
