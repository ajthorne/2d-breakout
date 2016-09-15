let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

//globally stored variables
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let ballRadius = 7.5;
let paddleHeight = 13;
let paddleWidth = 70;
let paddleX = (canvas.width - paddleWidth) / 2;
// ^ defines where the paddle begins on x-axis

let leftPress = false;
let rightPress = false;
//key presses for event listeners

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

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

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, 15, ballRadius, 0, Math.PI * 2, false);
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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    x += dx;
    y += dy;

    if (y + dy < ballRadius) {
        //if ball position is greater than the height of the canvas, reverse y axis movement
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        //if ball is on x-axis where the paddle is
            dy = -dy;
      } else {
      alert('YOU\'RE KILLING ME SMALLS!');
      document.location.reload();
    }
  }

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        //if ball position is greater than the width of the canvas, reverse x axis movement
        dx = -dx;
    }

    if(rightPress && paddleX < canvas.width-paddleWidth) {
        paddleX += 6;
    }
    else if(leftPress && paddleX > 0) {
        paddleX -= 6;
    }
}
setInterval(draw, 10);
//set interval redraws the ball so that it appears to be moving

//define rectangles
// ctx.beginPath();
// ctx.rect(20, 40, 60, 30);
// ctx.fillStyle = "#F8B290";
// ctx.fill();
// ctx.closePath();
//
// ctx.beginPath();
// ctx.rect(95, 40, 60, 30);
// ctx.fillStyle = "#F8B290";
// ctx.fill();
// ctx.closePath();
//
// ctx.beginPath();
// ctx.rect(170, 40, 60, 30);
// ctx.fillStyle = "#F8B290";
// ctx.fill();
// ctx.closePath();




//define circle/ball
// ctx.beginPath();
// ctx.arc(240, 160, 15, 0, Math.PI*2, false);
// ctx.fillStyle = "#70777A";
// ctx.fill();
// ctx.closePath();
