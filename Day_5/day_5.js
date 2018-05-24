var cwidth = 100;
var cheight = 100;
var time;
var current;
var canvas;
var ctx;
var posX = [cwidth / 2];
var posY = [cheight / 2];
var slength = [1];
var direction = 0; // 1234 == ↑→↓←
var food; // food[0] == X, food[1] == Y

window.onload = function () {
    setup();
}

function setup() {
    canvas = document.getElementById('canvas');
    canvas.width = cwidth;
    canvas.height = cheight;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(posX[0], posY[0], slength[0], 1);
        ctx.fillStyle = 'rgb(255, 0, 0)';
        food = [Math.round(Math.random() * 100), Math.round(Math.random() * 100)];
        ctx.fillRect(food[0], food[1], 1, 1);
        ctx.fillStyle = 'rgb(0, 0, 0)';
        window.addEventListener('keydown', doKeydown, true);
        window.focus();
    }
}

function draw() {
    time = new Date();

    if (Math.round(time.getMilliseconds() / 60) != current) {
        // clear the canvas
        ctx.clearRect(0, 0, cwidth, cheight);

        // move forward
        if (direction == 1) {
            posY[0] -= 1;
        }
        if (direction == 2) {
            posX[0] += 1;
        }
        if (direction == 3) {
            posY[0] += 1;
        }
        if (direction == 4) {
            posX[0] -= 1;
        }

        // draw the snake
        for (var i = 0; i < slength.length; i++) {
            ctx.fillRect(posX[i], posY[i], slength[i], 1);
        }

        // draw the food
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(food[0], food[1], 1, 1);
        ctx.fillStyle = 'rgb(0, 0, 0)';

        // touch the food
        if (posX[0] == food[0] && posY[0] == food[1]) {
            food = [Math.round(Math.random() * 100), Math.round(Math.random() * 100)];
            slength.push(1);
            posX.push(posX[posX.length - 1]);
            posY.push(posY[posY.length - 1]);
        }

        // touch the body
        for (var i = 1; i < slength.length; i++) {
            if (posX[0] == posX[i] && posY[0] == posY[i]) {
                return;
            }
        }

        // touch the wall
        if (posX[0] > cwidth || posX[0] < 0 || posY[0] > cheight || posY[0] < 0) {
            return;
        }

        // update poses of snake body
        for (var i = slength.length - 1; i > 0; i--) {
            posX[i] = posX[i - 1];
            posY[i] = posY[i - 1];
        }
    }

    current = Math.round(time.getMilliseconds() / 60);
    window.requestAnimationFrame(draw);
}

function doKeydown(e) {
    draw();
    var keyID = e.keyCode;
    if (keyID === 38 || keyID === 87) { // up arrow and w
        if (direction != 3) {
            direction = 1;
        }
        e.preventDefault(); //取消事件的默认动作
    }
    if (keyID === 39 || keyID === 68) { // right arrow and d
        if (direction != 4) {
            direction = 2;
        }
        e.preventDefault(); //取消事件的默认动作
    }
    if (keyID === 40 || keyID === 83) { // down arrow and s
        if (direction != 1) {
            direction = 3;
        }
        e.preventDefault(); //取消事件的默认动作
    }
    if (keyID === 37 || keyID === 65) { // left arrow and a
        if (direction != 2) {
            direction = 4;
        }
        e.preventDefault(); //取消事件的默认动作
    }
}