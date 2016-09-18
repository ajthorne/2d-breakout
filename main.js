(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//globally stored variables
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 7.5;
var paddleHeight = 13;
var paddleWidth = 70;
var paddleX = (canvas.width - paddleWidth) / 2;
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
        bricks[c][r] = { x: 0, y: 0 };
    }
}

var leftPress = false;
var rightPress = false;
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

function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#70777A";
            ctx.fill();
            ctx.closePath();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
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
            // alert('YOU\'RE KILLING ME SMALLS!');
            //change to modal
            // document.location.reload();
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
}
setInterval(draw, 10);
//set interval redraws the ball so that it appears to be moving

//define rectangles
// ctx.beginPath();
// ctx.rect(20, 40, 60, 30);
// ctx.fillStyle = "#F8B290";
// ctx.fill();
// ctx.closePath();


//code developed with help of https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript/

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixVQUF4QixDQUFiO0FBQ0EsSUFBSSxNQUFNLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFWOztBQUVBO0FBQ0EsSUFBSSxJQUFJLE9BQU8sS0FBUCxHQUFlLENBQXZCO0FBQ0EsSUFBSSxJQUFJLE9BQU8sTUFBUCxHQUFnQixFQUF4QjtBQUNBLElBQUksS0FBSyxDQUFUO0FBQ0EsSUFBSSxLQUFLLENBQUMsQ0FBVjtBQUNBLElBQUksYUFBYSxHQUFqQjtBQUNBLElBQUksZUFBZSxFQUFuQjtBQUNBLElBQUksY0FBYyxFQUFsQjtBQUNBLElBQUksVUFBVSxDQUFDLE9BQU8sS0FBUCxHQUFlLFdBQWhCLElBQStCLENBQTdDO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGdCQUFnQixDQUFwQjtBQUNBLElBQUksbUJBQW1CLENBQXZCO0FBQ0EsSUFBSSxhQUFhLEVBQWpCO0FBQ0EsSUFBSSxjQUFjLEVBQWxCO0FBQ0EsSUFBSSxlQUFlLEVBQW5CO0FBQ0EsSUFBSSxpQkFBaUIsRUFBckI7QUFDQSxJQUFJLGtCQUFrQixFQUF0Qjs7QUFFQSxJQUFJLFNBQVMsRUFBYjtBQUNBLEtBQUksSUFBSSxJQUFFLENBQVYsRUFBYSxJQUFFLGdCQUFmLEVBQWlDLEdBQWpDLEVBQXNDO0FBQ2xDLFdBQU8sQ0FBUCxJQUFZLEVBQVo7QUFDQSxTQUFJLElBQUksSUFBRSxDQUFWLEVBQWEsSUFBRSxhQUFmLEVBQThCLEdBQTlCLEVBQW1DO0FBQy9CLGVBQU8sQ0FBUCxFQUFVLENBQVYsSUFBZSxFQUFFLEdBQUcsQ0FBTCxFQUFRLEdBQUcsQ0FBWCxFQUFmO0FBQ0g7QUFDSjs7QUFFRCxJQUFJLFlBQVksS0FBaEI7QUFDQSxJQUFJLGFBQWEsS0FBakI7QUFDQTs7QUFFQSxTQUFTLGdCQUFULENBQTBCLFNBQTFCLEVBQXFDLGNBQXJDLEVBQXFELEtBQXJEO0FBQ0EsU0FBUyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxZQUFuQyxFQUFpRCxLQUFqRDs7QUFFQSxTQUFTLGNBQVQsQ0FBd0IsQ0FBeEIsRUFBMkI7QUFDdkIsUUFBSSxFQUFFLE9BQUYsSUFBYSxFQUFqQixFQUFxQjtBQUNqQixxQkFBYSxJQUFiO0FBQ0gsS0FGRCxNQUVPLElBQUksRUFBRSxPQUFGLElBQWEsRUFBakIsRUFBcUI7QUFDeEIsb0JBQVksSUFBWjtBQUNIO0FBQ0o7O0FBRUQsU0FBUyxZQUFULENBQXNCLENBQXRCLEVBQXlCO0FBQ3JCLFFBQUksRUFBRSxPQUFGLElBQWEsRUFBakIsRUFBcUI7QUFDakIscUJBQWEsS0FBYjtBQUNILEtBRkQsTUFFTyxJQUFJLEVBQUUsT0FBRixJQUFhLEVBQWpCLEVBQXFCO0FBQ3hCLG9CQUFZLEtBQVo7QUFDSDtBQUNKOztBQUVELFNBQVMsUUFBVCxHQUFvQjtBQUNoQixRQUFJLFNBQUo7QUFDQSxRQUFJLEdBQUosQ0FBUSxDQUFSLEVBQVcsQ0FBWCxFQUFjLEVBQWQsRUFBa0IsVUFBbEIsRUFBOEIsQ0FBOUIsRUFBaUMsS0FBSyxFQUFMLEdBQVUsQ0FBM0MsRUFBOEMsS0FBOUM7QUFDQSxRQUFJLFNBQUosR0FBZ0IsU0FBaEI7QUFDQSxRQUFJLElBQUo7QUFDQSxRQUFJLFNBQUo7QUFDSDs7QUFFRCxTQUFTLFVBQVQsR0FBc0I7QUFDbEIsUUFBSSxTQUFKO0FBQ0EsUUFBSSxJQUFKLENBQVMsT0FBVCxFQUFrQixPQUFPLE1BQVAsR0FBZ0IsWUFBbEMsRUFBZ0QsV0FBaEQsRUFBNkQsWUFBN0Q7QUFDQSxRQUFJLFNBQUosR0FBZ0IsU0FBaEI7QUFDQSxRQUFJLElBQUo7QUFDQSxRQUFJLFNBQUo7QUFDSDs7QUFFRCxTQUFTLFVBQVQsR0FBc0I7QUFDbEIsU0FBSSxJQUFJLElBQUUsQ0FBVixFQUFhLElBQUUsZ0JBQWYsRUFBaUMsR0FBakMsRUFBc0M7QUFDbEMsYUFBSSxJQUFJLElBQUUsQ0FBVixFQUFhLElBQUUsYUFBZixFQUE4QixHQUE5QixFQUFtQztBQUMvQixnQkFBSSxTQUFVLEtBQUcsYUFBVyxZQUFkLENBQUQsR0FBOEIsZUFBM0M7QUFDQSxnQkFBSSxTQUFVLEtBQUcsY0FBWSxZQUFmLENBQUQsR0FBK0IsY0FBNUM7QUFDQSxtQkFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsR0FBaUIsTUFBakI7QUFDQSxtQkFBTyxDQUFQLEVBQVUsQ0FBVixFQUFhLENBQWIsR0FBaUIsTUFBakI7QUFDQSxnQkFBSSxTQUFKO0FBQ0EsZ0JBQUksSUFBSixDQUFTLE1BQVQsRUFBaUIsTUFBakIsRUFBeUIsVUFBekIsRUFBcUMsV0FBckM7QUFDQSxnQkFBSSxTQUFKLEdBQWdCLFNBQWhCO0FBQ0EsZ0JBQUksSUFBSjtBQUNBLGdCQUFJLFNBQUo7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsU0FBUyxJQUFULEdBQWdCO0FBQ1osUUFBSSxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixPQUFPLEtBQTNCLEVBQWtDLE9BQU8sTUFBekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFLLEVBQUw7QUFDQSxTQUFLLEVBQUw7O0FBRUEsUUFBSSxJQUFJLEVBQUosR0FBUyxVQUFiLEVBQXlCO0FBQ3JCO0FBQ0EsYUFBSyxDQUFDLEVBQU47QUFDSCxLQUhELE1BR08sSUFBSSxJQUFJLEVBQUosR0FBUyxPQUFPLE1BQVAsR0FBYyxVQUEzQixFQUF1QztBQUM1QyxZQUFHLElBQUksT0FBSixJQUFlLElBQUksVUFBVSxXQUFoQyxFQUE2QztBQUMzQztBQUNJLGlCQUFLLENBQUMsRUFBTjtBQUNMLFNBSEQsTUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNEO0FBQ0Y7O0FBRUMsUUFBSSxJQUFJLEVBQUosR0FBUyxPQUFPLEtBQVAsR0FBZSxVQUF4QixJQUFzQyxJQUFJLEVBQUosR0FBUyxVQUFuRCxFQUErRDtBQUMzRDtBQUNBLGFBQUssQ0FBQyxFQUFOO0FBQ0g7O0FBRUQsUUFBRyxjQUFjLFVBQVUsT0FBTyxLQUFQLEdBQWEsV0FBeEMsRUFBcUQ7QUFDakQsbUJBQVcsQ0FBWDtBQUNILEtBRkQsTUFHSyxJQUFHLGFBQWEsVUFBVSxDQUExQixFQUE2QjtBQUM5QixtQkFBVyxDQUFYO0FBQ0g7QUFDSjtBQUNELFlBQVksSUFBWixFQUFrQixFQUFsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibGV0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteUNhbnZhcycpO1xubGV0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4vL2dsb2JhbGx5IHN0b3JlZCB2YXJpYWJsZXNcbmxldCB4ID0gY2FudmFzLndpZHRoIC8gMjtcbmxldCB5ID0gY2FudmFzLmhlaWdodCAtIDMwO1xubGV0IGR4ID0gMjtcbmxldCBkeSA9IC0yO1xubGV0IGJhbGxSYWRpdXMgPSA3LjU7XG5sZXQgcGFkZGxlSGVpZ2h0ID0gMTM7XG5sZXQgcGFkZGxlV2lkdGggPSA3MDtcbmxldCBwYWRkbGVYID0gKGNhbnZhcy53aWR0aCAtIHBhZGRsZVdpZHRoKSAvIDI7XG4vLyBeIGRlZmluZXMgd2hlcmUgdGhlIHBhZGRsZSBiZWdpbnMgb24geC1heGlzXG5cbi8vYnJpY2sgdmFyaWFibGVzXG5sZXQgYnJpY2tSb3dDb3VudCA9IDM7XG5sZXQgYnJpY2tDb2x1bW5Db3VudCA9IDU7XG5sZXQgYnJpY2tXaWR0aCA9IDgwO1xubGV0IGJyaWNrSGVpZ2h0ID0gMjA7XG5sZXQgYnJpY2tQYWRkaW5nID0gMTA7XG5sZXQgYnJpY2tPZmZzZXRUb3AgPSAzMDtcbmxldCBicmlja09mZnNldExlZnQgPSAzMDtcblxubGV0IGJyaWNrcyA9IFtdO1xuZm9yKHZhciBjPTA7IGM8YnJpY2tDb2x1bW5Db3VudDsgYysrKSB7XG4gICAgYnJpY2tzW2NdID0gW107XG4gICAgZm9yKHZhciByPTA7IHI8YnJpY2tSb3dDb3VudDsgcisrKSB7XG4gICAgICAgIGJyaWNrc1tjXVtyXSA9IHsgeDogMCwgeTogMCB9O1xuICAgIH1cbn1cblxubGV0IGxlZnRQcmVzcyA9IGZhbHNlO1xubGV0IHJpZ2h0UHJlc3MgPSBmYWxzZTtcbi8va2V5IHByZXNzZXMgZm9yIGV2ZW50IGxpc3RlbmVyc1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duSGFuZGxlciwgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleVVwSGFuZGxlciwgZmFsc2UpO1xuXG5mdW5jdGlvbiBrZXlEb3duSGFuZGxlcihlKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAzOSkge1xuICAgICAgICByaWdodFByZXNzID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzNykge1xuICAgICAgICBsZWZ0UHJlc3MgPSB0cnVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24ga2V5VXBIYW5kbGVyKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDM5KSB7XG4gICAgICAgIHJpZ2h0UHJlc3MgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzNykge1xuICAgICAgICBsZWZ0UHJlc3MgPSBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdCYWxsKCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHgsIHksIDE1LCBiYWxsUmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3MDc3N0FcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZnVuY3Rpb24gZHJhd1BhZGRsZSgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QocGFkZGxlWCwgY2FudmFzLmhlaWdodCAtIHBhZGRsZUhlaWdodCwgcGFkZGxlV2lkdGgsIHBhZGRsZUhlaWdodCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzcwNzc3QVwiO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xufVxuXG5mdW5jdGlvbiBkcmF3QnJpY2tzKCkge1xuICAgIGZvcih2YXIgYz0wOyBjPGJyaWNrQ29sdW1uQ291bnQ7IGMrKykge1xuICAgICAgICBmb3IodmFyIHI9MDsgcjxicmlja1Jvd0NvdW50OyByKyspIHtcbiAgICAgICAgICAgIGxldCBicmlja1ggPSAoYyooYnJpY2tXaWR0aCticmlja1BhZGRpbmcpKSticmlja09mZnNldExlZnQ7XG4gICAgICAgICAgICBsZXQgYnJpY2tZID0gKHIqKGJyaWNrSGVpZ2h0K2JyaWNrUGFkZGluZykpK2JyaWNrT2Zmc2V0VG9wO1xuICAgICAgICAgICAgYnJpY2tzW2NdW3JdLnggPSBicmlja1g7XG4gICAgICAgICAgICBicmlja3NbY11bcl0ueSA9IGJyaWNrWTtcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGN0eC5yZWN0KGJyaWNrWCwgYnJpY2tZLCBicmlja1dpZHRoLCBicmlja0hlaWdodCk7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjNzA3NzdBXCI7XG4gICAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmF3KCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBkcmF3QnJpY2tzKCk7XG4gICAgZHJhd0JhbGwoKTtcbiAgICBkcmF3UGFkZGxlKCk7XG4gICAgeCArPSBkeDtcbiAgICB5ICs9IGR5O1xuXG4gICAgaWYgKHkgKyBkeSA8IGJhbGxSYWRpdXMpIHtcbiAgICAgICAgLy9pZiBiYWxsIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiB0aGUgaGVpZ2h0IG9mIHRoZSBjYW52YXMsIHJldmVyc2UgeSBheGlzIG1vdmVtZW50XG4gICAgICAgIGR5ID0gLWR5O1xuICAgIH0gZWxzZSBpZiAoeSArIGR5ID4gY2FudmFzLmhlaWdodC1iYWxsUmFkaXVzKSB7XG4gICAgICBpZih4ID4gcGFkZGxlWCAmJiB4IDwgcGFkZGxlWCArIHBhZGRsZVdpZHRoKSB7XG4gICAgICAgIC8vaWYgYmFsbCBpcyBvbiB4LWF4aXMgd2hlcmUgdGhlIHBhZGRsZSBpc1xuICAgICAgICAgICAgZHkgPSAtZHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgLy8gYWxlcnQoJ1lPVVxcJ1JFIEtJTExJTkcgTUUgU01BTExTIScpO1xuICAgICAgLy9jaGFuZ2UgdG8gbW9kYWxcbiAgICAgIC8vIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gICAgaWYgKHggKyBkeCA+IGNhbnZhcy53aWR0aCAtIGJhbGxSYWRpdXMgfHwgeCArIGR4IDwgYmFsbFJhZGl1cykge1xuICAgICAgICAvL2lmIGJhbGwgcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIHRoZSB3aWR0aCBvZiB0aGUgY2FudmFzLCByZXZlcnNlIHggYXhpcyBtb3ZlbWVudFxuICAgICAgICBkeCA9IC1keDtcbiAgICB9XG5cbiAgICBpZihyaWdodFByZXNzICYmIHBhZGRsZVggPCBjYW52YXMud2lkdGgtcGFkZGxlV2lkdGgpIHtcbiAgICAgICAgcGFkZGxlWCArPSA2O1xuICAgIH1cbiAgICBlbHNlIGlmKGxlZnRQcmVzcyAmJiBwYWRkbGVYID4gMCkge1xuICAgICAgICBwYWRkbGVYIC09IDY7XG4gICAgfVxufVxuc2V0SW50ZXJ2YWwoZHJhdywgMTApO1xuLy9zZXQgaW50ZXJ2YWwgcmVkcmF3cyB0aGUgYmFsbCBzbyB0aGF0IGl0IGFwcGVhcnMgdG8gYmUgbW92aW5nXG5cbi8vZGVmaW5lIHJlY3RhbmdsZXNcbi8vIGN0eC5iZWdpblBhdGgoKTtcbi8vIGN0eC5yZWN0KDIwLCA0MCwgNjAsIDMwKTtcbi8vIGN0eC5maWxsU3R5bGUgPSBcIiNGOEIyOTBcIjtcbi8vIGN0eC5maWxsKCk7XG4vLyBjdHguY2xvc2VQYXRoKCk7XG5cblxuLy9jb2RlIGRldmVsb3BlZCB3aXRoIGhlbHAgb2YgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9HYW1lcy9UdXRvcmlhbHMvMkRfQnJlYWtvdXRfZ2FtZV9wdXJlX0phdmFTY3JpcHQvXG4iXX0=
