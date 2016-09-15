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

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            alert('YOU\'RE KILLING ME SMALLS!');
            document.location.reload();
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2NyaXB0cy9lbnRyeS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsSUFBSSxTQUFTLFNBQVMsY0FBVCxDQUF3QixVQUF4QixDQUFiO0FBQ0EsSUFBSSxNQUFNLE9BQU8sVUFBUCxDQUFrQixJQUFsQixDQUFWOztBQUVBO0FBQ0EsSUFBSSxJQUFJLE9BQU8sS0FBUCxHQUFlLENBQXZCO0FBQ0EsSUFBSSxJQUFJLE9BQU8sTUFBUCxHQUFnQixFQUF4QjtBQUNBLElBQUksS0FBSyxDQUFUO0FBQ0EsSUFBSSxLQUFLLENBQUMsQ0FBVjtBQUNBLElBQUksYUFBYSxHQUFqQjtBQUNBLElBQUksZUFBZSxFQUFuQjtBQUNBLElBQUksY0FBYyxFQUFsQjtBQUNBLElBQUksVUFBVSxDQUFDLE9BQU8sS0FBUCxHQUFlLFdBQWhCLElBQStCLENBQTdDO0FBQ0E7O0FBRUEsSUFBSSxZQUFZLEtBQWhCO0FBQ0EsSUFBSSxhQUFhLEtBQWpCO0FBQ0E7O0FBRUEsU0FBUyxnQkFBVCxDQUEwQixTQUExQixFQUFxQyxjQUFyQyxFQUFxRCxLQUFyRDtBQUNBLFNBQVMsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUMsWUFBbkMsRUFBaUQsS0FBakQ7O0FBRUEsU0FBUyxjQUFULENBQXdCLENBQXhCLEVBQTJCO0FBQ3ZCLFFBQUksRUFBRSxPQUFGLElBQWEsRUFBakIsRUFBcUI7QUFDakIscUJBQWEsSUFBYjtBQUNILEtBRkQsTUFFTyxJQUFJLEVBQUUsT0FBRixJQUFhLEVBQWpCLEVBQXFCO0FBQ3hCLG9CQUFZLElBQVo7QUFDSDtBQUNKOztBQUVELFNBQVMsWUFBVCxDQUFzQixDQUF0QixFQUF5QjtBQUNyQixRQUFJLEVBQUUsT0FBRixJQUFhLEVBQWpCLEVBQXFCO0FBQ2pCLHFCQUFhLEtBQWI7QUFDSCxLQUZELE1BRU8sSUFBSSxFQUFFLE9BQUYsSUFBYSxFQUFqQixFQUFxQjtBQUN4QixvQkFBWSxLQUFaO0FBQ0g7QUFDSjs7QUFFRCxTQUFTLFFBQVQsR0FBb0I7QUFDaEIsUUFBSSxTQUFKO0FBQ0EsUUFBSSxHQUFKLENBQVEsQ0FBUixFQUFXLENBQVgsRUFBYyxFQUFkLEVBQWtCLFVBQWxCLEVBQThCLENBQTlCLEVBQWlDLEtBQUssRUFBTCxHQUFVLENBQTNDLEVBQThDLEtBQTlDO0FBQ0EsUUFBSSxTQUFKLEdBQWdCLFNBQWhCO0FBQ0EsUUFBSSxJQUFKO0FBQ0EsUUFBSSxTQUFKO0FBQ0g7O0FBRUQsU0FBUyxVQUFULEdBQXNCO0FBQ2xCLFFBQUksU0FBSjtBQUNBLFFBQUksSUFBSixDQUFTLE9BQVQsRUFBa0IsT0FBTyxNQUFQLEdBQWdCLFlBQWxDLEVBQWdELFdBQWhELEVBQTZELFlBQTdEO0FBQ0EsUUFBSSxTQUFKLEdBQWdCLFNBQWhCO0FBQ0EsUUFBSSxJQUFKO0FBQ0EsUUFBSSxTQUFKO0FBQ0g7O0FBRUQsU0FBUyxJQUFULEdBQWdCO0FBQ1osUUFBSSxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixPQUFPLEtBQTNCLEVBQWtDLE9BQU8sTUFBekM7QUFDQTtBQUNBO0FBQ0EsU0FBSyxFQUFMO0FBQ0EsU0FBSyxFQUFMOztBQUVBLFFBQUksSUFBSSxFQUFKLEdBQVMsVUFBYixFQUF5QjtBQUNyQjtBQUNBLGFBQUssQ0FBQyxFQUFOO0FBQ0gsS0FIRCxNQUdPLElBQUksSUFBSSxFQUFKLEdBQVMsT0FBTyxNQUFQLEdBQWMsVUFBM0IsRUFBdUM7QUFDNUMsWUFBRyxJQUFJLE9BQUosSUFBZSxJQUFJLFVBQVUsV0FBaEMsRUFBNkM7QUFDM0M7QUFDSSxpQkFBSyxDQUFDLEVBQU47QUFDTCxTQUhELE1BR087QUFDUCxrQkFBTSw0QkFBTjtBQUNBLHFCQUFTLFFBQVQsQ0FBa0IsTUFBbEI7QUFDRDtBQUNGOztBQUVDLFFBQUksSUFBSSxFQUFKLEdBQVMsT0FBTyxLQUFQLEdBQWUsVUFBeEIsSUFBc0MsSUFBSSxFQUFKLEdBQVMsVUFBbkQsRUFBK0Q7QUFDM0Q7QUFDQSxhQUFLLENBQUMsRUFBTjtBQUNIOztBQUVELFFBQUcsY0FBYyxVQUFVLE9BQU8sS0FBUCxHQUFhLFdBQXhDLEVBQXFEO0FBQ2pELG1CQUFXLENBQVg7QUFDSCxLQUZELE1BR0ssSUFBRyxhQUFhLFVBQVUsQ0FBMUIsRUFBNkI7QUFDOUIsbUJBQVcsQ0FBWDtBQUNIO0FBQ0o7QUFDRCxZQUFZLElBQVosRUFBa0IsRUFBbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215Q2FudmFzJyk7XG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbi8vZ2xvYmFsbHkgc3RvcmVkIHZhcmlhYmxlc1xubGV0IHggPSBjYW52YXMud2lkdGggLyAyO1xubGV0IHkgPSBjYW52YXMuaGVpZ2h0IC0gMzA7XG5sZXQgZHggPSAyO1xubGV0IGR5ID0gLTI7XG5sZXQgYmFsbFJhZGl1cyA9IDcuNTtcbmxldCBwYWRkbGVIZWlnaHQgPSAxMztcbmxldCBwYWRkbGVXaWR0aCA9IDcwO1xubGV0IHBhZGRsZVggPSAoY2FudmFzLndpZHRoIC0gcGFkZGxlV2lkdGgpIC8gMjtcbi8vIF4gZGVmaW5lcyB3aGVyZSB0aGUgcGFkZGxlIGJlZ2lucyBvbiB4LWF4aXNcblxubGV0IGxlZnRQcmVzcyA9IGZhbHNlO1xubGV0IHJpZ2h0UHJlc3MgPSBmYWxzZTtcbi8va2V5IHByZXNzZXMgZm9yIGV2ZW50IGxpc3RlbmVyc1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBrZXlEb3duSGFuZGxlciwgZmFsc2UpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGtleVVwSGFuZGxlciwgZmFsc2UpO1xuXG5mdW5jdGlvbiBrZXlEb3duSGFuZGxlcihlKSB7XG4gICAgaWYgKGUua2V5Q29kZSA9PSAzOSkge1xuICAgICAgICByaWdodFByZXNzID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzNykge1xuICAgICAgICBsZWZ0UHJlc3MgPSB0cnVlO1xuICAgIH1cbn1cblxuZnVuY3Rpb24ga2V5VXBIYW5kbGVyKGUpIHtcbiAgICBpZiAoZS5rZXlDb2RlID09IDM5KSB7XG4gICAgICAgIHJpZ2h0UHJlc3MgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKGUua2V5Q29kZSA9PSAzNykge1xuICAgICAgICBsZWZ0UHJlc3MgPSBmYWxzZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdCYWxsKCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHgsIHksIDE1LCBiYWxsUmFkaXVzLCAwLCBNYXRoLlBJICogMiwgZmFsc2UpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBcIiM3MDc3N0FcIjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbn1cblxuZnVuY3Rpb24gZHJhd1BhZGRsZSgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3QocGFkZGxlWCwgY2FudmFzLmhlaWdodCAtIHBhZGRsZUhlaWdodCwgcGFkZGxlV2lkdGgsIHBhZGRsZUhlaWdodCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiIzcwNzc3QVwiO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xufVxuXG5mdW5jdGlvbiBkcmF3KCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBkcmF3QmFsbCgpO1xuICAgIGRyYXdQYWRkbGUoKTtcbiAgICB4ICs9IGR4O1xuICAgIHkgKz0gZHk7XG5cbiAgICBpZiAoeSArIGR5IDwgYmFsbFJhZGl1cykge1xuICAgICAgICAvL2lmIGJhbGwgcG9zaXRpb24gaXMgZ3JlYXRlciB0aGFuIHRoZSBoZWlnaHQgb2YgdGhlIGNhbnZhcywgcmV2ZXJzZSB5IGF4aXMgbW92ZW1lbnRcbiAgICAgICAgZHkgPSAtZHk7XG4gICAgfSBlbHNlIGlmICh5ICsgZHkgPiBjYW52YXMuaGVpZ2h0LWJhbGxSYWRpdXMpIHtcbiAgICAgIGlmKHggPiBwYWRkbGVYICYmIHggPCBwYWRkbGVYICsgcGFkZGxlV2lkdGgpIHtcbiAgICAgICAgLy9pZiBiYWxsIGlzIG9uIHgtYXhpcyB3aGVyZSB0aGUgcGFkZGxlIGlzXG4gICAgICAgICAgICBkeSA9IC1keTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICBhbGVydCgnWU9VXFwnUkUgS0lMTElORyBNRSBTTUFMTFMhJyk7XG4gICAgICBkb2N1bWVudC5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG4gIH1cblxuICAgIGlmICh4ICsgZHggPiBjYW52YXMud2lkdGggLSBiYWxsUmFkaXVzIHx8IHggKyBkeCA8IGJhbGxSYWRpdXMpIHtcbiAgICAgICAgLy9pZiBiYWxsIHBvc2l0aW9uIGlzIGdyZWF0ZXIgdGhhbiB0aGUgd2lkdGggb2YgdGhlIGNhbnZhcywgcmV2ZXJzZSB4IGF4aXMgbW92ZW1lbnRcbiAgICAgICAgZHggPSAtZHg7XG4gICAgfVxuXG4gICAgaWYocmlnaHRQcmVzcyAmJiBwYWRkbGVYIDwgY2FudmFzLndpZHRoLXBhZGRsZVdpZHRoKSB7XG4gICAgICAgIHBhZGRsZVggKz0gNjtcbiAgICB9XG4gICAgZWxzZSBpZihsZWZ0UHJlc3MgJiYgcGFkZGxlWCA+IDApIHtcbiAgICAgICAgcGFkZGxlWCAtPSA2O1xuICAgIH1cbn1cbnNldEludGVydmFsKGRyYXcsIDEwKTtcbi8vc2V0IGludGVydmFsIHJlZHJhd3MgdGhlIGJhbGwgc28gdGhhdCBpdCBhcHBlYXJzIHRvIGJlIG1vdmluZ1xuXG4vL2RlZmluZSByZWN0YW5nbGVzXG4vLyBjdHguYmVnaW5QYXRoKCk7XG4vLyBjdHgucmVjdCgyMCwgNDAsIDYwLCAzMCk7XG4vLyBjdHguZmlsbFN0eWxlID0gXCIjRjhCMjkwXCI7XG4vLyBjdHguZmlsbCgpO1xuLy8gY3R4LmNsb3NlUGF0aCgpO1xuLy9cbi8vIGN0eC5iZWdpblBhdGgoKTtcbi8vIGN0eC5yZWN0KDk1LCA0MCwgNjAsIDMwKTtcbi8vIGN0eC5maWxsU3R5bGUgPSBcIiNGOEIyOTBcIjtcbi8vIGN0eC5maWxsKCk7XG4vLyBjdHguY2xvc2VQYXRoKCk7XG4vL1xuLy8gY3R4LmJlZ2luUGF0aCgpO1xuLy8gY3R4LnJlY3QoMTcwLCA0MCwgNjAsIDMwKTtcbi8vIGN0eC5maWxsU3R5bGUgPSBcIiNGOEIyOTBcIjtcbi8vIGN0eC5maWxsKCk7XG4vLyBjdHguY2xvc2VQYXRoKCk7XG5cblxuXG5cbi8vZGVmaW5lIGNpcmNsZS9iYWxsXG4vLyBjdHguYmVnaW5QYXRoKCk7XG4vLyBjdHguYXJjKDI0MCwgMTYwLCAxNSwgMCwgTWF0aC5QSSoyLCBmYWxzZSk7XG4vLyBjdHguZmlsbFN0eWxlID0gXCIjNzA3NzdBXCI7XG4vLyBjdHguZmlsbCgpO1xuLy8gY3R4LmNsb3NlUGF0aCgpO1xuIl19
