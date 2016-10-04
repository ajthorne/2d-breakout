(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//globally stored variables
var score = 0;
var lives = 3;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 7.5;
var paddleHeight = 13;
var paddleWidth = 70;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleY = canvas.height - 10;
// ^ defines where the paddle begins on x-axis

//brick variables
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 80;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var bricks = [];
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

var leftPress = false;
var rightPress = false;
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
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
        for (r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight + 25) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    //     if(score === brickRowCount*brickColumnCount) {
                    //     alert("YOU WIN, CONGRATULATIONS!");
                    //     document.location.reload();
                    // }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "1.2rem Helvetica";
    ctx.fillStyle = "limegreen";
    ctx.fillText("Score: " + score, 8, 22);
}

function drawLives() {
    ctx.font = "1.2rem Helvetica";
    ctx.fillStyle = "limegreen";
    ctx.fillText("Lives: " + lives, canvas.width - 75, 22);
}

function drawTitle() {
    // ctx.shadowColor = "black";
    // ctx.shadowOffsetX = 2;
    // ctx.shadowOffsetY = 2;
    // ctx.shadowBlur = 5;
    var text = "2D Breakout";
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
                var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
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
            if (!lives) {
                // alert("YOU'RE KILLING ME SMALLS");
                // document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixVQUF4QixDQUFiO0FBQ0EsSUFBSSxNQUFNLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFWOztBQUVBO0FBQ0EsSUFBSSxRQUFRLENBQVo7QUFDQSxJQUFJLFFBQVEsQ0FBWjtBQUNBLElBQUksSUFBSSxPQUFPLEtBQVAsR0FBZSxDQUF2QjtBQUNBLElBQUksSUFBSSxPQUFPLE1BQVAsR0FBZ0IsRUFBeEI7QUFDQSxJQUFJLEtBQUssQ0FBVDtBQUNBLElBQUksS0FBSyxDQUFDLENBQVY7QUFDQSxJQUFJLGFBQWEsR0FBakI7QUFDQSxJQUFJLGVBQWUsRUFBbkI7QUFDQSxJQUFJLGNBQWMsRUFBbEI7QUFDQSxJQUFJLFVBQVUsQ0FBQyxPQUFPLEtBQVAsR0FBZSxXQUFoQixJQUErQixDQUE3QztBQUNBLElBQUksVUFBVyxPQUFPLE1BQVAsR0FBZ0IsRUFBL0I7QUFDQTs7QUFFQTtBQUNBLElBQUksZ0JBQWdCLENBQXBCO0FBQ0EsSUFBSSxtQkFBbUIsQ0FBdkI7QUFDQSxJQUFJLGFBQWEsRUFBakI7QUFDQSxJQUFJLGNBQWMsRUFBbEI7QUFDQSxJQUFJLGVBQWUsRUFBbkI7QUFDQSxJQUFJLGlCQUFpQixFQUFyQjtBQUNBLElBQUksa0JBQWtCLEVBQXRCOztBQUVBLElBQUksU0FBUyxFQUFiO0FBQ0EsS0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGdCQUFwQixFQUFzQyxHQUF0QyxFQUEyQztBQUN2QyxXQUFPLENBQVAsSUFBWSxFQUFaO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLGFBQXBCLEVBQW1DLEdBQW5DLEVBQXdDO0FBQ3BDLGVBQU8sQ0FBUCxFQUFVLENBQVYsSUFBZTtBQUNYLGVBQUcsQ0FEUTtB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WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImxldCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlDYW52YXMnKTtcbmxldCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuLy9nbG9iYWxseSBzdG9yZWQgdmFyaWFibGVzXG5sZXQgc2NvcmUgPSAwO1xubGV0IGxpdmVzID0gMztcbmxldCB4ID0gY2FudmFzLndpZHRoIC8gMjtcbmxldCB5ID0gY2FudmFzLmhlaWdodCAtIDMwO1xubGV0IGR4ID0gMjtcbmxldCBkeSA9IC0yO1xubGV0IGJhbGxSYWRpdXMgPSA3LjU7XG5sZXQgcGFkZGxlSGVpZ2h0ID0gMTM7XG5sZXQgcGFkZGxlV2lkdGggPSA3MDtcbmxldCBwYWRkbGVYID0gKGNhbnZhcy53aWR0aCAtIHBhZGRsZVdpZHRoKSAvIDI7XG5sZXQgcGFkZGxlWSA9IChjYW52YXMuaGVpZ2h0IC0gMTApO1xuLy8gXiBkZWZpbmVzIHdoZXJlIHRoZSBwYWRkbGUgYmVnaW5zIG9uIHgtYXhpc1xuXG4vL2JyaWNrIHZhcmlhYmxlc1xubGV0IGJyaWNrUm93Q291bnQgPSAzO1xubGV0IGJyaWNrQ29sdW1uQ291bnQgPSA1O1xubGV0IGJyaWNrV2lkdGggPSA4MDtcbmxldCBicmlja0hlaWdodCA9IDIwO1xubGV0IGJyaWNrUGFkZGluZyA9IDEwO1xubGV0IGJyaWNrT2Zmc2V0VG9wID0gMzA7XG5sZXQgYnJpY2tPZmZzZXRMZWZ0ID0gMzA7XG5cbmxldCBicmlja3MgPSBbXTtcbmZvciAodmFyIGMgPSAwOyBjIDwgYnJpY2tDb2x1bW5Db3VudDsgYysrKSB7XG4gICAgYnJpY2tzW2NdID0gW107XG4gICAgZm9yICh2YXIgciA9IDA7IHIgPCBicmlja1Jvd0NvdW50OyByKyspIHtcbiAgICAgICAgYnJpY2tzW2NdW3JdID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICBzdGF0dXM6IDFcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmxldCBsZWZ0UHJlc3MgPSBmYWxzZTtcbmxldCByaWdodFByZXNzID0gZmFsc2U7XG4vL2tleSBwcmVzc2VzIGZvciBldmVudCBsaXN0ZW5lcnNcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwga2V5RG93bkhhbmRsZXIsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBrZXlVcEhhbmRsZXIsIGZhbHNlKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgbW91c2VNb3ZlSGFuZGxlciwgZmFsc2UpO1xuXG5mdW5jdGlvbiBrZXlEb3duSGFuZGxlcihlKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAzOSkge1xuICAgICAgICByaWdodFByZXNzID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzNykge1xuICAgICAgICBsZWZ0UHJlc3MgPSB0cnVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24ga2V5VXBIYW5kbGVyKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDM5KSB7XG4gICAgICAgIHJpZ2h0UHJlc3MgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzNykge1xuICAgICAgICBsZWZ0UHJlc3MgPSBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vdXNlTW92ZUhhbmRsZXIoZSkge1xuICAgIHZhciByZWxhdGl2ZVggPSBlLmNsaWVudFggLSBjYW52YXMub2Zmc2V0TGVmdDtcbiAgICBpZihyZWxhdGl2ZVggPiAwICYmIHJlbGF0aXZlWCA8IGNhbnZhcy53aWR0aCkge1xuICAgICAgICBwYWRkbGVYID0gcmVsYXRpdmVYIC0gcGFkZGxlV2lkdGgvMjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNvbGxpc2lvbkRldGVjdGlvbigpIHtcbiAgICBmb3IgKGMgPSAwOyBjIDwgYnJpY2tDb2x1bW5Db3VudDsgYysrKSB7XG4gICAgICAgIGZvciAociA9IDA7IHIgPCBicmlja1Jvd0NvdW50OyByKyspIHtcbiAgICAgICAgICAgIHZhciBiID0gYnJpY2tzW2NdW3JdO1xuICAgICAgICAgICAgaWYoYi5zdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgICAgIGlmKHggPiBiLnggJiYgeCA8IGIueCticmlja1dpZHRoICYmIHkgPiBiLnkgJiYgeSA8IGIueSticmlja0hlaWdodCsyNSkge1xuICAgICAgICAgICAgICAgICAgICBkeSA9IC1keTtcbiAgICAgICAgICAgICAgICAgICAgYi5zdGF0dXMgPSAwO1xuICAgICAgICAgICAgICAgICAgICBzY29yZSsrO1xuICAgICAgICAgICAgICAgIC8vICAgICBpZihzY29yZSA9PT0gYnJpY2tSb3dDb3VudCpicmlja0NvbHVtbkNvdW50KSB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGFsZXJ0KFwiWU9VIFdJTiwgQ09OR1JBVFVMQVRJT05TIVwiKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhd1Njb3JlKCkge1xuICAgIGN0eC5mb250ID0gXCIxLjJyZW0gSGVsdmV0aWNhXCI7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwibGltZWdyZWVuXCI7XG4gICAgY3R4LmZpbGxUZXh0KFwiU2NvcmU6IFwiK3Njb3JlLCA4LCAyMik7XG59XG5cbmZ1bmN0aW9uIGRyYXdMaXZlcygpIHtcbiAgICBjdHguZm9udCA9IFwiMS4ycmVtIEhlbHZldGljYVwiO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImxpbWVncmVlblwiO1xuICAgIGN0eC5maWxsVGV4dChcIkxpdmVzOiBcIitsaXZlcywgY2FudmFzLndpZHRoLTc1LCAyMik7XG59XG5cbmZ1bmN0aW9uIGRyYXdUaXRsZSgpIHtcbiAgICAvLyBjdHguc2hhZG93Q29sb3IgPSBcImJsYWNrXCI7XG4gICAgLy8gY3R4LnNoYWRvd09mZnNldFggPSAyO1xuICAgIC8vIGN0eC5zaGFkb3dPZmZzZXRZID0gMjtcbiAgICAvLyBjdHguc2hhZG93Qmx1ciA9IDU7XG4gICAgbGV0IHRleHQgPSBcIjJEIEJyZWFrb3V0XCJcbiAgICBjdHguZm9udCA9IFwiMS44cmVtIEhlbHZldGljYVwiO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcImdyYXlcIjtcbiAgICBjdHguZmlsbFRleHQodGV4dCwgMTc3LCAzMCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwibGltZWdyZWVuXCI7XG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIDE3NSwgMjgpO1xufVxuXG5mdW5jdGlvbiBkcmF3QmFsbCgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh4LCB5LCAxMCwgYmFsbFJhZGl1cywgMCwgTWF0aC5QSSAqIDIsIGZhbHNlKTtcbiAgICBjdHguZmlsbFN0eWxlID0gXCIjNzA3NzdBXCI7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG59XG5cbmZ1bmN0aW9uIGRyYXdQYWRkbGUoKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHBhZGRsZVgsIGNhbnZhcy5oZWlnaHQgLSBwYWRkbGVIZWlnaHQsIHBhZGRsZVdpZHRoLCBwYWRkbGVIZWlnaHQpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3MDc3N0FcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZnVuY3Rpb24gZHJhd0JyaWNrcygpIHtcbiAgICBmb3IgKHZhciBjID0gMDsgYyA8IGJyaWNrQ29sdW1uQ291bnQ7IGMrKykge1xuICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IGJyaWNrUm93Q291bnQ7IHIrKykge1xuICAgICAgICAgICAgaWYgKGJyaWNrc1tjXVtyXS5zdGF0dXMgPT0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBicmlja1ggPSAoYyAqIChicmlja1dpZHRoICsgYnJpY2tQYWRkaW5nKSkgKyBicmlja09mZnNldExlZnQ7XG4gICAgICAgICAgICAgICAgdmFyIGJyaWNrWSA9IChyICogKGJyaWNrSGVpZ2h0ICsgYnJpY2tQYWRkaW5nKSkgKyBicmlja09mZnNldFRvcDtcbiAgICAgICAgICAgICAgICBicmlja3NbY11bcl0ueCA9IGJyaWNrWDtcbiAgICAgICAgICAgICAgICBicmlja3NbY11bcl0ueSA9IGJyaWNrWTtcbiAgICAgICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgY3R4LnJlY3QoYnJpY2tYLCBicmlja1kgKyAxNSwgYnJpY2tXaWR0aCwgYnJpY2tIZWlnaHQpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3MDc3N0FcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhdygpIHtcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgZHJhd0JyaWNrcygpO1xuICAgIGRyYXdCYWxsKCk7XG4gICAgZHJhd1BhZGRsZSgpO1xuICAgIGNvbGxpc2lvbkRldGVjdGlvbigpO1xuICAgIGRyYXdTY29yZSgpO1xuICAgIGRyYXdMaXZlcygpO1xuICAgIGRyYXdUaXRsZSgpO1xuICAgIHggKz0gZHg7XG4gICAgeSArPSBkeTtcblxuICAgIGlmICh5ICsgZHkgPCBiYWxsUmFkaXVzKSB7XG4gICAgICAgIC8vaWYgYmFsbCBwb3NpdGlvbiBpcyBncmVhdGVyIHRoYW4gdGhlIGhlaWdodCBvZiB0aGUgY2FudmFzLCByZXZlcnNlIHkgYXhpcyBtb3ZlbWVudFxuICAgICAgICBkeSA9IC1keTtcbiAgICB9IGVsc2UgaWYgKHkgKyBkeSA+IGNhbnZhcy5oZWlnaHQgLSBiYWxsUmFkaXVzKSB7XG4gICAgICAgIGlmICh4ID4gcGFkZGxlWCAmJiB4IDwgcGFkZGxlWCArIHBhZGRsZVdpZHRoKSB7XG4gICAgICAgICAgICAvL2lmIGJhbGwgaXMgb24geC1heGlzIHdoZXJlIHRoZSBwYWRkbGUgaXNcbiAgICAgICAgICAgIGR5ID0gLWR5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpdmVzLS07XG4gICAgICAgICAgaWYoIWxpdmVzKSB7XG4gICAgICAgICAgICAgIC8vIGFsZXJ0KFwiWU9VJ1JFIEtJTExJTkcgTUUgU01BTExTXCIpO1xuICAgICAgICAgICAgICAvLyBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHggPSBjYW52YXMud2lkdGgvMjtcbiAgICAgICAgICAgICAgeSA9IGNhbnZhcy5oZWlnaHQtMzA7XG4gICAgICAgICAgICAgIGR4ID0gMjtcbiAgICAgICAgICAgICAgZHkgPSAtMjtcbiAgICAgICAgICAgICAgcGFkZGxlWCA9IChjYW52YXMud2lkdGgtcGFkZGxlV2lkdGgpLzI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHggKyBkeCA+IGNhbnZhcy53aWR0aCAtIGJhbGxSYWRpdXMgfHwgeCArIGR4IDwgYmFsbFJhZGl1cykge1xuICAgICAgICAvL2lmIGJhbGwgcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIHRoZSB3aWR0aCBvZiB0aGUgY2FudmFzLCByZXZlcnNlIHggYXhpcyBtb3ZlbWVudFxuICAgICAgICBkeCA9IC1keDtcbiAgICB9XG5cbiAgICBpZiAocmlnaHRQcmVzcyAmJiBwYWRkbGVYIDwgY2FudmFzLndpZHRoIC0gcGFkZGxlV2lkdGgpIHtcbiAgICAgICAgcGFkZGxlWCArPSA2O1xuICAgIH0gZWxzZSBpZiAobGVmdFByZXNzICYmIHBhZGRsZVggPiAwKSB7XG4gICAgICAgIHBhZGRsZVggLT0gNjtcbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyYXcpO1xuICAgIC8vZ2l2ZXMgY29udHJvbCBvZiBmcmFtZXJhdGUgdG8gYnJvd3NlciByYXRoZXIgdGhhbiBhIHN0YXRpYyBzZXRpbnRlcnZhbFxufVxuZHJhdygpO1xuLy8gc2V0SW50ZXJ2YWwoZHJhdywgMTApO1xuLy9zZXQgaW50ZXJ2YWwgcmVkcmF3cyB0aGUgYmFsbCBzbyB0aGF0IGl0IGFwcGVhcnMgdG8gYmUgbW92aW5nXG5cblxuLy9jb2RlIGRldmVsb3BlZCB3aXRoIGhlbHAgb2YgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UdXRvcmlhbHMvMkRfQnJlYWtvdXRfZ2FtZV9wdXJlX0phdmFTY3JpcHQvXG4iXX0=
